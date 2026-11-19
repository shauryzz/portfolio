import { Component, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

function Sculpture({ paused, pointer, low, onSlow, onContextLoss }) {
  const canvas = useThree(state => state.gl.domElement);
  useEffect(() => {
    const lost = event => { event.preventDefault(); onContextLoss(); };
    canvas.addEventListener('webglcontextlost', lost);
    return () => canvas.removeEventListener('webglcontextlost', lost);
  }, [canvas, onContextLoss]);
  const group = useRef(null);
  const seed = useMemo(() => {
    let n = 937;
    const random = () => ((n = (n * 16807) % 2147483647) - 1) / 2147483646;
    const positions = new Float32Array((low ? 220 : 540) * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (random() - .5) * 37;
      positions[i + 1] = (random() - .5) * 23;
      positions[i + 2] = -2 - random() * 16;
    }
    return positions;
  }, [low]);
  const stars = useRef(null);
  const phase = useRef(0);
  const sample = useRef({ time: 0, frames: 0 });
  useEffect(() => { sample.current = { time: 0, frames: 0 }; }, [paused, low]);
  useFrame((state, dt) => {
    if (state.gl.getContext().isContextLost()) { onContextLoss(); return; }
    if (!paused && !low && dt > 0 && dt < .25) {
      sample.current.time += dt;
      sample.current.frames += 1;
      if (sample.current.time >= 3) {
        if (sample.current.frames / sample.current.time < 30) onSlow();
        sample.current = { time: 0, frames: 0 };
      }
    }
    if (paused || !group.current) return;
    const delta = Math.min(dt, .05);
    phase.current += delta;
    const t = phase.current;
    group.current.rotation.y += delta * .21;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, .16 + pointer.current.y * .24, .045);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.current.x * .4, .04);
    group.current.position.y = -.12 + Math.sin(t * .65) * .11;
    if (stars.current) stars.current.rotation.z = t * .006;
  });
  return <>
    <ambientLight intensity={.12} />
    <directionalLight position={[-4, 3, -2]} intensity={3.4} color="#c7eaff" />
    <directionalLight position={[5, 2, 3]} intensity={.85} color="#b2cbdc" />
    <pointLight position={[-2, -2, 1]} intensity={14} color="#d5edff" decay={2} />
    <group ref={group} rotation={[.16, .3, -.28]}>
      <mesh>
        <torusKnotGeometry args={[1.35, .5, low ? 96 : 160, low ? 12 : 20, 2, 3]} />
        <meshStandardMaterial color="#151b20" metalness={.68} roughness={.31} />
      </mesh>
      <mesh rotation={[.15, .2, .7]}>
        <torusGeometry args={[2.35, .023, low ? 6 : 10, low ? 64 : 120]} />
        <meshStandardMaterial color="#718b91" metalness={.6} roughness={.3} emissive="#192c31" />
      </mesh>
    </group>
    <points ref={stars}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[seed, 3]} /></bufferGeometry>
      <pointsMaterial color="#d8e4e8" size={.036} transparent opacity={.64} sizeAttenuation depthWrite={false} />
    </points>
  </>;
}

export default function CinematicScene({ paused }) {
  const ref = useRef(null);
  const pointer = useRef({x:0, y:0});
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [foreground, setForeground] = useState(true);
  const [low, setLow] = useState(() => typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4));
  const [lost, setLost] = useState(false);
  const [retry, setRetry] = useState(0);
  const onSlow = useCallback(() => setLow(true), []);
  const onContextLoss = useCallback(() => { setLow(true); setLost(true); }, []);
  useEffect(() => {
    if (!lost || retry >= 1) return;
    const timer = window.setTimeout(() => { setRetry(1); setLost(false); }, 1500);
    return () => window.clearTimeout(timer);
  }, [lost, retry]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(media.matches);
    change();
    if (media.addEventListener) media.addEventListener('change', change);
    else media.addListener(change);
    const observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting)) : null;
    if (ref.current) observer?.observe(ref.current);
    const visibility = () => setForeground(!document.hidden);
    visibility();
    document.addEventListener('visibilitychange', visibility);
    const move = (e) => { pointer.current = {x: e.clientX / window.innerWidth * 2 - 1, y: e.clientY / window.innerHeight * 2 - 1}; };
    window.addEventListener('pointermove', move, {passive:true});
    return () => {
      if (media.removeEventListener) media.removeEventListener('change', change);
      else media.removeListener(change);
      observer?.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('pointermove', move);
    };
  }, []);
  return <div ref={ref} className={`sa-cinema ${paused ? 'is-paused' : ''}`} aria-hidden="true">
    <div className="sa-portal"><i/><b/></div>
    <div className="sa-cinema-fallback" />
    {!lost && <SceneBoundary key={retry}>
      <Canvas className="sa-three" dpr={low ? 1 : [1, 1.5]} camera={{ position:[0,0,9], fov:43 }} gl={{alpha:true, antialias:!low, powerPreference:'default'}} frameloop={visible && foreground && !paused && !reduced ? 'always' : 'demand'} fallback={null}>
        <Sculpture paused={paused || reduced || !visible || !foreground} pointer={pointer} low={low} onSlow={onSlow} onContextLoss={onContextLoss}/>
      </Canvas>
    </SceneBoundary>}
    <div className="sa-cinema-vignette" />
  </div>;
}
