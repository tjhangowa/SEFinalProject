import { Application, Sprite, Assets, Text, Container, Graphics, BlurFilter } from 'pixi.js';

async function main() {
    const app = new Application();
    await app.init({ width: window.innerWidth, height: window.innerHeight, antialias: true });

    const container = document.getElementById('pixi-container');
    (container ?? document.body).appendChild(app.canvas);

        const ASSET_NAMES = {
            startbackground: '/assets/postapocalypse2.png',
            font:  '/assets/upheavtt.ttf',
        };

    try {
        const texture = await Assets.load(ASSET_NAMES.startbackground);
        
        const background = new Sprite(texture);
        background.anchor.set(0); // top-left
        background.zIndex = 0;
        app.stage.addChild(background);
        
  
        
        // Load font for text usage
        const fontFace = new FontFace('GameFont', `url(${ASSET_NAMES.font})`);
        await fontFace.load();
        (document as any).fonts.add(fontFace);
                // (background already added above)

                // Create title text 'Infection X'
                const title = new Text('INFECTION \nX', {
                    fontFamily: 'GameFont',
                    fontSize: 160,
                    align: 'center',
                    fontWeight: 'bold',
                    fill: '#E1D3AE',
                    letterSpacing: 7,
                    dropShadow: {
                        color: '#000000ff',
                        alpha: 1,
                        blur: 0,
                        angle: Math.PI / 4,
                        distance: 12,
                    },
                });
                app.stage.addChild(title);

        // ---- Programmatic (no-image) button ----
        const uiLayer = new Container();
        uiLayer.zIndex = 20;
        app.stage.addChild(uiLayer);
        app.stage.sortableChildren = true;

        // Modal layer (overlays for info / settings)
        const modalLayer = new Container();
        modalLayer.zIndex = 50;
        app.stage.addChild(modalLayer);

        function clearModal() {
            modalLayer.removeChildren();
        }

<<<<<<< Updated upstream
  // Listen for animate update
  app.ticker.add((time) => {
    // Just for fun, let's rotate mr rabbit a little.
    // * Delta is 1 if running at 100% performance *
    // * Creates frame-independent transformation *
    bunny.rotation += 0.1 * time.deltaTime;
  });
})();

//test pull
=======
        function centerPanel(panel: Container) {
            panel.x = app.renderer.width / 2;
            panel.y = app.renderer.height / 2;
        }

        interface TextButton extends Container { labelText: Text; setLabel:(text:string)=>void; setFontSize:(size:number)=>void; }
        function createTextButton(label: string, width: number, height: number, onClick: () => void): TextButton {
            const root = new Container() as TextButton;
            const bg = new Graphics();
            const glow = new Graphics(); // outer glow layer
            const txtShadow = new Text(label, {
                fontFamily: 'GameFont',
                fontSize: 40,
                fill: '#000000', // subtle shadow color
                letterSpacing: 2,
            });
            const txt = new Text(label, {
                fontFamily: 'GameFont',
                fontSize: 40,
                fill: '#E1D3AE',
                letterSpacing: 2,
                dropShadow: {
                    color: '#000000ff',
                    alpha: 0.8,
                    blur: 0,
                    angle: Math.PI / 4,
                    distance: 6,
                },
            });
            txt.anchor.set(0.5);
            txtShadow.anchor.set(0.5);
            txtShadow.x = 1;
            txtShadow.y = 1;

            glow.filters = [new BlurFilter({ strength: 20, quality: 5 })];
            glow.alpha = 0; // start hidden
            glow.blendMode = 'add';

            const state = { hover: false, t: 0 }; // t: 0..1 progress

            // [Hover Render] This draws the button each frame using state.t (0..1)
            function draw() {
                bg.clear();
                glow.clear();
                const baseColor = 0x314B1B;
                //0xA0522D
                                const borderColor = 0xFFD700;
                                const p = state.t; // eased hover progress
                                const borderAlpha = p; // no border at rest, only on hover
                const fillAlpha = 1;
                const radius = 11;
                                // Draw fill first (always visible)
                                bg.beginFill(baseColor, fillAlpha)
                                    .drawRoundedRect(-width/2, -height/2, width, height, radius)
                                    .endFill();
                                // Only draw the border stroke when hovering
                                if (p > 0.001) {
                                    bg.lineStyle(5 + 2 * p, borderColor, borderAlpha)
                                        .drawRoundedRect(-width/2, -height/2, width, height, radius);
                                }
                // Glow expansion & intensity
                if (p > 0) {
                    const glowExp = 14 + 20 * p; // grows on hover
                    glow.beginFill(0x111111, 0.25 * p)
                        .drawRoundedRect(-width/2 - glowExp/2, -height/2 - glowExp/2, width + glowExp, height + glowExp, radius + 6)
                        .endFill();
                    glow.alpha = p;
                } else {
                    glow.alpha = 0;
                }
                txtShadow.alpha = 0.4 + 0.4 * p;
                txt.scale.set(1 + 0.02 * p); // slight scale pulse
            }
            draw();

            root.addChild(glow, bg, txtShadow, txt);
            root.eventMode = 'static';
            root.cursor = 'pointer';
            root.on('pointerover', () => {
                // [Before Hover] Code here runs right before hover animation starts
                state.hover = true;
                // [After Hover Start] Code here runs right after hover is triggered
            });
            root.on('pointerout', () => {
                // [Before Hover End] Code here runs right before hover-out animation starts
                state.hover = false;
                // [After Hover End Triggered] Code here runs right after hover-out is triggered
            });
            root.on('pointerdown', () => onClick());

            app.ticker.add(() => {
                const target = state.hover ? 1 : 0;
                // Smooth ease toward target (game feel)
                state.t += (target - state.t) * 0.18; // adjust factor for speed
                if (Math.abs(target - state.t) < 0.001) {
                    state.t = target;
                    // [After Animation Completed] Runs once when hover-in reaches 1 or hover-out reaches 0
                    // Place code here if you need to react when the animation fully finishes
                }
                draw();
            });

            // expose helpers
            root.labelText = txt;
            root.setLabel = (text:string) => { txt.text = text; txtShadow.text = text; };
            root.setFontSize = (size:number) => { txt.style.fontSize = size; txtShadow.style.fontSize = size; };
            return root;
        }

        // --- INFO MODAL ---
        function showInfoModal() {
            clearModal();
            const overlay = new Graphics();
            overlay.beginFill(0x000000, 0.85).drawRect(0, 0, app.renderer.width, app.renderer.height).endFill();
            overlay.eventMode = 'static';
            modalLayer.addChild(overlay);

            const panelW = 1000;
            const panelH = 520;
            const panel = new Container();
            const panelBG = new Graphics();
            panelBG.beginFill(0x101010, 0.92).drawRoundedRect(-panelW/2, -panelH/2, panelW, panelH, 30).endFill();
            panelBG.lineStyle(4, 0xFFD700, 1).drawRoundedRect(-panelW/2, -panelH/2, panelW, panelH, 30);
            panel.addChild(panelBG);

            const margin = 32;
            const heading = new Text('HOW TO PLAY', {
                fontFamily: 'GameFont',
                fontSize: 58,
                fill: 0xFFD700, // Added requested gold color inside box
                letterSpacing: 4,
            });
            heading.anchor.set(0, 0);
            heading.x = -panelW/2 + margin;
            heading.y = -panelH/2 + margin;
            panel.addChild(heading);

            // Scrollable content area
            const contentAreaHeight = panelH - margin*2 - 120; // space below heading and above bottom
            const bodyContainer = new Container();
            bodyContainer.x = -panelW/2 + margin;
            bodyContainer.y = heading.y + 90;
            panel.addChild(bodyContainer);

            const body = new Text(
                'Infection spreads rapidly – survive as long as you can!\n\n' +
                '• Move: WASD or Arrow Keys\n' +
                '• Avoid: Infected zones / enemies\n' +
                '• Collect: Antidote / supply drops for score\n' +
                '• Buff Zones: Glowing areas offer power-ups (risk vs reward)\n' +
                '• Use Health Stations to cleanse infection buildup\n' +
                '• Craft upgrades with materials you gather\n' +
                'Goal: Stay uninfected and maximize score before time runs out. Longer help text will wrap automatically and remain within panel bounds.',
                {
                    fontFamily: 'GameFont',
                    fontSize: 30,
                    fill: '#C9C3AF',
                    letterSpacing: 1,
                    align: 'left',
                    wordWrap: true,
                    wordWrapWidth: panelW - margin*2 - 16,
                    breakWords: true,
                }
            );
            body.anchor.set(0, 0);
            bodyContainer.addChild(body);

            // Mask to clip overflowing text
            const maskG = new Graphics()
                .beginFill(0xffffff)
                .drawRect(-panelW/2 + margin, bodyContainer.y, panelW - margin*2, contentAreaHeight)
                .endFill();
            panel.addChild(maskG);
            bodyContainer.mask = maskG;

            // Simple wheel scroll if content taller than area
            if (body.height > contentAreaHeight) {
                bodyContainer.eventMode = 'static';
                bodyContainer.on('wheel', (e: any) => {
                    const delta = e.deltaY > 0 ? -30 : 30;
                    bodyContainer.y = Math.min(heading.y + 90, Math.max(heading.y + 90 - (body.height - contentAreaHeight), bodyContainer.y + delta));
                });
            }

            const closeBtn = createTextButton('CLOSE', 160, 70, () => {
                clearModal();
            });
            closeBtn.x = panelW/2 - margin - 80;
            closeBtn.y = -panelH/2 + margin + 35;
            panel.addChild(closeBtn);

            centerPanel(panel);
            modalLayer.addChild(panel);
        }

        // --- SETTINGS MODAL ---
        let musicEnabled = true; // placeholder state
        function showSettingsModal() {
            clearModal();
            const overlay = new Graphics();
            overlay.beginFill(0x000000, 0.85).drawRect(0, 0, app.renderer.width, app.renderer.height).endFill();
            overlay.eventMode = 'static';
            modalLayer.addChild(overlay);

            const panelW = 600;
            const panelH = 420;
            const panel = new Container();
            const panelBG = new Graphics();
            panelBG.beginFill(0x121418, 0.94).drawRoundedRect(-panelW/2, -panelH/2, panelW, panelH, 26).endFill();
            panelBG.lineStyle(4, 0xFFD700, 1).drawRoundedRect(-panelW/2, -panelH/2, panelW, panelH, 26);
            panel.addChild(panelBG);

            const heading = new Text('SETTINGS', {
                fontFamily: 'GameFont',
                fontSize: 54,
                fill: '#E1D3AE',
                letterSpacing: 4,
            });
            heading.anchor.set(0, 0);
            const margin = 28;
            heading.x = -panelW/2 + margin;
            heading.y = -panelH/2 + margin;
            panel.addChild(heading);

            const status = new Text('', {
                fontFamily: 'GameFont',
                fontSize: 34,
                fill: '#C9C3AF',
                letterSpacing: 2,
            });
            status.anchor.set(0, 0);
            status.x = -panelW/2 + margin;
            status.y = heading.y + 90;
            panel.addChild(status);
            function updateStatus() { status.text = 'Music: ' + (musicEnabled ? 'ON' : 'OFF'); }
            updateStatus();

            const toggleBtn = createTextButton('TOGGLE MUSIC', 280, 80, () => {
                musicEnabled = !musicEnabled;
                updateStatus();
                // Hook actual audio logic here
            });
            toggleBtn.x = 0;
            toggleBtn.y = status.y + 140;
            panel.addChild(toggleBtn);

            const closeBtn = createTextButton('CLOSE', 160, 70, () => {
                clearModal();
            });
            closeBtn.x = panelW/2 - margin - 80;
            closeBtn.y = -panelH/2 + margin + 35;
            panel.addChild(closeBtn);

            centerPanel(panel);
            modalLayer.addChild(panel);
        }

        const infoPureButton = createTextButton('INFO', 240, 90, () => {
            showInfoModal();
        });
        uiLayer.addChild(infoPureButton);

        const startPureButton = createTextButton('START', 300, 110, () => {
            // eslint-disable-next-line no-console
            console.log('Start button clicked (pure)');
        });
        // Make START text bigger
        startPureButton.setFontSize(80);
        uiLayer.addChild(startPureButton);

        const creditsPureButton = createTextButton('SETTINGS', 240, 90, () => {
            showSettingsModal();
        });
        // Make SETTINGS text smaller
        creditsPureButton.setFontSize(40);
        uiLayer.addChild(creditsPureButton);

        const layoutButtons = () => {
            const w = app.renderer.width;
            const h = app.renderer.height;
            const centerX = w / 2;
            const baseY = h * .85;
            const gap = 300;
            startPureButton.x = centerX;
            startPureButton.y = baseY;
            infoPureButton.x = centerX- gap;
            infoPureButton.y = baseY;
            creditsPureButton.x = centerX + gap;
            creditsPureButton.y = baseY;
        };

        const resize = () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);

            const w = app.renderer.width;
            const h = app.renderer.height;
            const scale = Math.max(w / texture.width, h / texture.height); // cover
            background.scale.set(scale);
            background.x = (w - background.width) * 0; // align left (change to 0.5 to center)
            background.y = (h - background.height) * 0; // align top (change to 0.5 to center)

            // Center title horizontally at top with padding
            title.x = (w - title.width) / 2;
            title.y = 24;
            layoutButtons();
            // Recenter modals & resize overlay
            if (modalLayer.children.length > 0) {
                modalLayer.children.forEach((c, idx) => {
                    if (c instanceof Graphics && idx === 0) { // overlay assumed first
                        (c as Graphics).clear().beginFill(0x000000, 0.85).drawRect(0,0,app.renderer.width, app.renderer.height).endFill();
                    } else if (c instanceof Container) {
                        centerPanel(c as Container);
                    }
                });
            }
        };

        resize();
        window.addEventListener('resize', resize);
    } catch (error) {
        console.error('Error loading image:', error);
    }
}

main();
>>>>>>> Stashed changes
