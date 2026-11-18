import { Component, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

function Sculpture({ paused, pointer }) {
  const group = useRef(null);
  const seed = useMemo(() => {
    let n = 937;
    const random = () => ((n = (n * 16807) % 2147483647) - 1) / 2147483646;
    const positions = new Float32Array(540 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (random() - .5) * 37;
      positions[i + 1] = (random() - .5) * 23;
      positions[i + 2] = -2 - random() * 16;
    }
    return positions;
  }, []);
  const stars = useRef(null);
  const phase = useRef(0);
  useFrame((_, dt) => {
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
        <torusKnotGeometry args={[1.35, .5, 160, 20, 2, 3]} />
        <meshStandardMaterial color="#151b20" metalness={.68} roughness={.31} />
      </mesh>
      <mesh rotation={[.15, .2, .7]}>
        <torusGeometry args={[2.35, .023, 10, 120]} />
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
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(media.matches);
    change(); media.addEventListener('change', change);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    const move = (e) => { pointer.current = {x: e.clientX / window.innerWidth * 2 - 1, y: e.clientY / window.innerHeight * 2 - 1}; };
    window.addEventListener('pointermove', move, {passive:true});
    return () => { media.removeEventListener('change',change); observer.disconnect(); window.removeEventListener('pointermove',move); };
  }, []);
  return <div ref={ref} className={`sa-cinema ${paused ? 'is-paused' : ''}`} aria-hidden="true">
    <div className="sa-portal"><i/><b/></div>
    <div className="sa-cinema-fallback" />
    <SceneBoundary>
      <Canvas className="sa-three" dpr={[1, 1.5]} camera={{ position:[0,0,9], fov:43 }} gl={{alpha:true, antialias:true, powerPreference:'high-performance'}} frameloop={visible && !paused && !reduced ? 'always' : 'demand'} fallback={null}>
        <Sculpture paused={paused || reduced || !visible} pointer={pointer}/>
      </Canvas>
    </SceneBoundary>
    <div className="sa-cinema-vignette" />
  </div>;
}
