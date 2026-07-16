'use client'

import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 19.19);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p); p *= 2.0; a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 pos = uv * 2.0 - 1.0;
  pos.x *= aspect;

  float t = uTime * 0.06;
  float n1 = fbm(pos * 1.5 + t);
  float n2 = fbm(pos * 2.5 - t * 0.7 + 1.2);
  float n3 = fbm(pos * 0.6 + t * 0.3);

  vec3 gold = vec3(0.788, 0.635, 0.294);
  vec3 goldLight = vec3(0.910, 0.788, 0.478);
  vec3 forest = vec3(0.059, 0.180, 0.118);
  vec3 forestDeep = vec3(0.031, 0.098, 0.063);

  float blend1 = smoothstep(0.3, 0.7, n1);
  float blend2 = smoothstep(0.2, 0.8, n2);

  vec3 base = mix(forest, forestDeep, blend1);
  vec3 accent = mix(goldLight, gold, blend2);
  vec3 color = mix(base, accent, n3 * 0.2);

  float grain = (hash21(uv * 100.0 + fract(uTime * 0.01)) - 0.5) * 0.03;
  color += grain;

  float dist = length(pos * vec2(aspect, 1.0));
  color *= 1.0 - dist * 0.25;

  gl_FragColor = vec4(color, 1.0);
}
`

export default function GoldFlow() {
  const { viewport, size } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size.width, size.height],
  )

  useFrame((_, delta) => {
    // eslint-disable-next-line react-hooks/immutability
    uniforms.uTime.value += delta
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  )
}
