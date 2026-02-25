import * as THREE from 'three';

/**
 * FBO-Based Gravitational Lensing Black Hole
 * Captures the scene into a RenderTarget and distorts it using a ShaderMaterial.
 */
export class BlackHole extends THREE.Group {
    private eventHorizon: THREE.Mesh;
    private accretionDisk: THREE.Mesh;
    private lens: THREE.Mesh;
    public lensMaterial: THREE.ShaderMaterial;

    constructor() {
        super();

        // 1. Event Horizon (The "Sucking" Void)
        const ehGeom = new THREE.SphereGeometry(15, 32, 32);
        const ehMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        this.eventHorizon = new THREE.Mesh(ehGeom, ehMat);
        this.add(this.eventHorizon);

        // 2. Accretion Disk (Will be rendered into FBO to be distorted)
        const diskGeom = new THREE.RingGeometry(18, 55, 64);
        const diskMat = new THREE.MeshStandardMaterial({
            color: '#ff8800',
            emissive: '#ff4400',
            emissiveIntensity: 10,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1
        });
        this.accretionDisk = new THREE.Mesh(diskGeom, diskMat);
        this.accretionDisk.rotation.x = Math.PI / 2;
        this.add(this.accretionDisk);

        // 3. Gravitational Lens Mesh (Sphere that captures the FBO)
        const lensGeom = new THREE.SphereGeometry(58, 64, 64);
        this.lensMaterial = new THREE.ShaderMaterial({
            uniforms: {
                tDiffuse: { value: null },
                uTime: { value: 0 },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            vertexShader: `
                varying vec4 vScreenPos;
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    vScreenPos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    gl_Position = vScreenPos;
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform float uTime;
                varying vec2 vUv;
                varying vec4 vScreenPos;

                void main() {
                    // Convert screen space coordinates to UV [0, 1]
                    vec2 screenUv = vScreenPos.xy / vScreenPos.w * 0.5 + 0.5;
                    
                    // Center of our lens in UV space
                    vec2 center = vec2(0.5);
                    vec2 dir = vUv - center;
                    float dist = length(dir);
                    
                    // Schwarzschild Radius (In local UV units)
                    float rs = 0.22;
                    
                    if (dist < rs) {
                        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
                        return;
                    }

                    // Einstein Ring / Lensing Distortion
                    // We pull pixels from screenUv towards our center
                    // The closer to the center, the more "outside" light we pull in
                    float distortion = 0.05 / (dist + 0.1);
                    vec2 distortedUv = screenUv - normalize(dir) * distortion * (1.0 - smoothstep(rs, 1.0, dist));
                    
                    vec4 color = texture2D(tDiffuse, distortedUv);
                    
                    // Add some chromatic aberration for extra juice
                    float ca = 0.003;
                    color.r = texture2D(tDiffuse, distortedUv + vec2(ca, 0.0)).r;
                    color.b = texture2D(tDiffuse, distortedUv - vec2(ca, 0.0)).b;

                    // Outward glow
                    float glow = smoothstep(1.0, rs, dist) * 0.2;
                    vec3 glowCol = vec3(1.0, 0.6, 0.2) * glow;

                    gl_FragColor = vec4(color.rgb + glowCol, 1.0);
                }
            `,
            transparent: true
        });

        this.lens = new THREE.Mesh(lensGeom, this.lensMaterial);
        this.add(this.lens);
    }

    public setLensVisible(val: boolean) {
        this.lens.visible = val;
    }

    public update(time: number) {
        this.accretionDisk.rotation.z = time * 0.3;
        this.lensMaterial.uniforms.uTime.value = time;
    }
}
