import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

// CATEGORÍAS MAESTRAS DE CONTROLES
const CONTROL_GROUPS = [
  {
    category: 'Transform (Global)',
    items: [
      { id: 'zoom', label: 'Zoom Scale', type: 'range', min: 0.1, max: 5.0, step: 0.05 },
      { id: 'rotation', label: 'Rotation', type: 'range', min: 0, max: 6.28, step: 0.01 },
      { id: 'panX', label: 'Flow X', type: 'range', min: -2, max: 2, step: 0.05 },
      { id: 'panY', label: 'Flow Y', type: 'range', min: -2, max: 2, step: 0.05 },
    ],
  },
  {
    category: 'Shader Math',
    items: [
      { id: 'speed', label: 'Time Speed', type: 'range', min: 0, max: 2, step: 0.05 },
      { id: 'complexity', label: 'Complexity', type: 'range', min: 0.5, max: 8, step: 0.1 },
      { id: 'glow', label: 'Glow Intensity', type: 'range', min: 1, max: 15, step: 0.5 },
      { id: 'blur', label: 'Edge Softness', type: 'range', min: 0.0, max: 1.0, step: 0.01 }, // NUEVO DESLIZADOR DE BLUR
    ],
  },
  {
    category: 'Color Palette',
    items: [
      { id: 'color1', label: 'Deep Base', type: 'color' },
      { id: 'color2', label: 'Midtone 1', type: 'color' },
      { id: 'color3', label: 'Midtone 2', type: 'color' },
      { id: 'color4', label: 'Highlight', type: 'color' },
    ],
  },
  {
    category: 'Post-Processing',
    items: [
      { id: 'grain', label: 'Film Grain', type: 'range', min: 0, max: 0.5, step: 0.01 },
      { id: 'vignette', label: 'Vignette Darkness', type: 'range', min: 0, max: 1, step: 0.01 },
    ],
  },
];

const ChevronIcon = ({ isOpen }) => (
  <svg
    className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-pink-500' : 'text-neutral-500'}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
  </svg>
);

const DockButton = ({ label, active, onClick, isDanger }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200 border-2 ${
      active
        ? 'bg-black text-white border-black shadow-lg scale-105'
        : isDanger
          ? 'bg-transparent text-neutral-500 border-transparent hover:bg-black/5 hover:text-black'
          : 'bg-transparent text-neutral-600 border-transparent hover:bg-black/5 hover:text-black'
    }`}
  >
    {label}
  </button>
);

export default function Sidebar({
  shaders,
  activeShaderId,
  setActiveShaderId,
  controls,
  updateControl,
  onExportImage,
}) {
  const [uiVisible, setUiVisible] = useState(true);
  const [activePanel, setActivePanel] = useState('tweak');

  const [imgRes, setImgRes] = useState('4K');
  const [imgFormat, setImgFormat] = useState('image/png');
  const [openColor, setOpenColor] = useState(null);
  const [openGroups, setOpenGroups] = useState(['Shader Math', 'Color Palette']);
  const [openShaderTypes, setOpenShaderTypes] = useState(['surface', 'lines']);

  const toggleShaderType = (type) => {
    setOpenShaderTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const activeShader = shaders.find((s) => s.config.id === activeShaderId);

  const toggleGroup = (category) => {
    setOpenGroups((prev) => (prev.includes(category) ? prev.filter((g) => g !== category) : [...prev, category]));
  };

  const togglePanel = (panelName) => {
    setActivePanel(activePanel === panelName ? null : panelName);
  };

  const groupedShaders = shaders.reduce((acc, shader) => {
    const type = shader.config.type || 'misc';

    if (!acc[type]) {
      acc[type] = [];
    }

    acc[type].push(shader);

    return acc;
  }, {});

  return (
    <>
      {/* LOGO PERSISTENTE CON COLOR MATEMÁTICO */}
      <div
        className={`absolute top-6 left-8 z-50 transition-all duration-500 drop-shadow-xl ${uiVisible ? 'opacity-100' : 'opacity-80'}`}
      >
        <h1 className="text-2xl font-black tracking-tighter">
          <span style={{ color: uiVisible ? controls.color2 || '#000' : '#ffffff', transition: 'color 0.5s ease' }}>
            GENERATIVE
          </span>
          <span style={{ color: uiVisible ? controls.color4 || '#ec4899' : '#ffffff', transition: 'color 0.5s ease' }}>
            LAB
          </span>
        </h1>
      </div>

      {/* BOTÓN FLOTANTE PARA MOSTRAR LA UI */}
      {!uiVisible && (
        <button
          onClick={() => setUiVisible(true)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/90 backdrop-blur-md border border-black/20 text-black rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        >
          Show Tools
        </button>
      )}

      {/* DOCK HORIZONTAL */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-2 bg-white/85 backdrop-blur-2xl border-2 border-black/10 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-out ${uiVisible ? 'translate-y-0' : 'translate-y-[200%]'}`}
      >
        <DockButton label="Visual Engines" active={activePanel === 'library'} onClick={() => togglePanel('library')} />
        <DockButton label="Adjustments" active={activePanel === 'tweak'} onClick={() => togglePanel('tweak')} />
        <DockButton label="Save & Export" active={activePanel === 'export'} onClick={() => togglePanel('export')} />

        <div className="w-px h-8 bg-black/10 mx-2 rounded-full"></div>

        <DockButton label="Hide UI" onClick={() => setUiVisible(false)} isDanger={true} />
      </div>

      {/* PANEL CONTEXTUAL LATERAL */}
      <aside
        className={`absolute top-20 left-6 z-40 w-[340px] max-h-[calc(100vh-160px)] flex flex-col bg-white/85 backdrop-blur-2xl border-2 border-black/10 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${uiVisible && activePanel ? 'translate-x-0 opacity-100' : '-translate-x-[120%] opacity-0'}`}
      >
        <div className="px-6 py-4 border-b border-black/10 bg-black/5 rounded-t-2xl">
          <h2 className="text-xs font-black text-black uppercase tracking-widest">
            {activePanel === 'library' && 'Select Visual Engine'}
            {activePanel === 'tweak' && 'Parameter Adjustments'}
            {activePanel === 'export' && 'Output Settings'}
          </h2>
        </div>

        {/* ÁREA DE CONTENIDO (Scroll seguro) */}
        <div className="p-5 overflow-y-auto flex-grow custom-scrollbar space-y-4">
          {activePanel === 'library' && (
            <div className="space-y-4">
              {Object.entries(groupedShaders).map(([type, shaderList]) => {
                const isOpen = openShaderTypes.includes(type);

                return (
                  <div key={type} className="border-2 border-black/10 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => toggleShaderType(type)}
                      className="w-full px-4 py-3 flex items-center justify-between bg-black/[0.03] hover:bg-black/[0.05] transition-all"
                    >
                      <span className="text-[10px] uppercase tracking-[0.25em] font-black text-black">{type}</span>

                      <ChevronIcon isOpen={isOpen} />
                    </button>

                    {isOpen && (
                      <div className="p-2 space-y-2 border-t border-black/5">
                        {shaderList.map((s) => (
                          <button
                            key={s.config.id}
                            onClick={() => setActiveShaderId(s.config.id)}
                            className={`w-full text-left p-4 rounded-xl border-2 text-xs font-bold transition-all ${
                              activeShaderId === s.config.id
                                ? 'bg-black text-white border-black shadow-md'
                                : 'bg-black/5 border-transparent text-neutral-600 hover:bg-black/10 hover:text-black'
                            }`}
                          >
                            {s.config.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activePanel === 'tweak' && (
            <div className="space-y-3">
              {activeShader?.config?.palettes && (
                <div className="border-2 border-black/10 bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-[10px] uppercase tracking-[0.25em] font-black text-neutral-500 mb-4">
                    Suggested Palettes
                  </div>

                  <div className="space-y-2">
                    {activeShader.config.palettes.map((palette, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          palette.forEach((color, index) => {
                            updateControl(`color${index + 1}`, color);
                          });
                        }}
                        className="w-full p-2 rounded-xl border-2 border-black/10 hover:border-black/30 transition-all hover:scale-[1.02]"
                      >
                        <div className="flex overflow-hidden rounded-lg h-10">
                          {palette.map((color) => (
                            <div key={color} className="flex-1" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {CONTROL_GROUPS.map((group) => {
                const isGroupOpen = openGroups.includes(group.category);

                return (
                  <div
                    key={group.category}
                    className="border-2 border-black/10 bg-white rounded-xl transition-colors hover:border-black/20 shadow-sm flex flex-col"
                  >
                    <button
                      onClick={() => toggleGroup(group.category)}
                      className={`w-full px-4 py-3.5 flex justify-between items-center outline-none bg-black/[0.02] hover:bg-black/[0.04] transition-all ${isGroupOpen ? 'rounded-t-xl' : 'rounded-xl'}`}
                    >
                      <span className="text-[10px] text-black uppercase tracking-widest font-black">
                        {group.category}
                      </span>
                      <ChevronIcon isOpen={isGroupOpen} />
                    </button>

                    {isGroupOpen && (
                      <div className="px-4 pb-4 pt-2 space-y-5 border-t-2 border-black/5 bg-white rounded-b-xl">
                        {group.items.map((ctrl) => {
                          const isGlobal =
                            group.category.includes('Global') || group.category.includes('Post-Processing');
                          const isActive = isGlobal || activeShader?.config.activeControls.includes(ctrl.id);

                          return (
                            <div
                              key={ctrl.id}
                              className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-30 pointer-events-none grayscale'}`}
                            >
                              <div className="flex justify-between text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-wide">
                                <span>{ctrl.label}</span>
                                {ctrl.type === 'range' && (
                                  <span className="text-black font-black bg-black/5 px-1.5 py-0.5 rounded">
                                    {controls[ctrl.id]?.toFixed(2)}
                                  </span>
                                )}
                              </div>

                              {ctrl.type === 'range' ? (
                                <input
                                  type="range"
                                  min={ctrl.min}
                                  max={ctrl.max}
                                  step={ctrl.step}
                                  value={controls[ctrl.id]}
                                  onChange={(e) => updateControl(ctrl.id, parseFloat(e.target.value))}
                                  className="w-full accent-pink-500 cursor-pointer h-1.5 bg-black/10 rounded-lg appearance-none"
                                />
                              ) : (
                                <div className="flex flex-col gap-2">
                                  {/* BOTÓN DE COLOR */}
                                  <div
                                    className="w-full h-10 rounded-xl border-2 border-black/10 cursor-pointer shadow-inner transition-transform active:scale-[0.98]"
                                    style={{ backgroundColor: controls[ctrl.id] }}
                                    onClick={() => setOpenColor(openColor === ctrl.id ? null : ctrl.id)}
                                  />

                                  {/* SELECTOR DE COLOR INLINE (Se expande hacia abajo, sin salirse) */}
                                  {openColor === ctrl.id && (
                                    <div className="w-full bg-black/[0.03] p-4 rounded-xl border-2 border-black/5 shadow-inner mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                                      <HexColorPicker
                                        color={controls[ctrl.id]}
                                        onChange={(c) => updateControl(ctrl.id, c)}
                                        style={{ width: '100%' }}
                                      />
                                      <button
                                        onClick={() => setOpenColor(null)}
                                        className="mt-4 w-full py-2 bg-white border-2 border-black/10 rounded-lg text-[10px] text-black uppercase font-black hover:bg-black/5 transition-colors shadow-sm"
                                      >
                                        Confirm Color
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activePanel === 'export' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-neutral-500 font-black uppercase tracking-widest">Resolution</label>
                  <select
                    value={imgRes}
                    onChange={(e) => setImgRes(e.target.value)}
                    className="w-full bg-black/5 border-2 border-black/10 text-[11px] p-3 rounded-xl text-black font-bold outline-none focus:border-pink-500 transition-colors"
                  >
                    <option value="1080p">1080p (FHD)</option>
                    <option value="4K">4K (UHD)</option>
                    <option value="8K">8K (Print)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-neutral-500 font-black uppercase tracking-widest">Format</label>
                  <select
                    value={imgFormat}
                    onChange={(e) => setImgFormat(e.target.value)}
                    className="w-full bg-black/5 border-2 border-black/10 text-[11px] p-3 rounded-xl text-black font-bold outline-none focus:border-pink-500 transition-colors"
                  >
                    <option value="image/png">PNG</option>
                    <option value="image/jpeg">JPEG</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => onExportImage(imgRes, imgFormat)}
                className="w-full py-4 mt-2 bg-black text-white font-black rounded-xl text-[11px] uppercase tracking-widest hover:bg-neutral-800 hover:shadow-lg hover:shadow-black/20 transition-all active:scale-[0.98]"
              >
                Save High-Res Render
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
