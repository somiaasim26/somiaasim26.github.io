import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Background3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Particles
    const count = 220
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const offsets = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 80
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
      speeds[i]  = 0.003 + Math.random() * 0.006
      offsets[i] = Math.random() * Math.PI * 2
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.PointsMaterial({
      color: 0x3B82F6,
      size: 0.22,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    // Lines between nearby particles
    const lineMat = new THREE.LineBasicMaterial({ color: 0x93C5FD, transparent: true, opacity: 0.18 })
    const lineGeo = new THREE.BufferGeometry()
    const linePositions = []
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i*3] - positions[j*3]
        const dy = positions[i*3+1] - positions[j*3+1]
        const dz = positions[i*3+2] - positions[j*3+2]
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz)
        if (dist < 12) {
          linePositions.push(positions[i*3], positions[i*3+1], positions[i*3+2])
          linePositions.push(positions[j*3], positions[j*3+1], positions[j*3+2])
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    // Floating spheres (decorative)
    const spheres = []
    const sphereColors = [0x93C5FD, 0x60A5FA, 0xBFDBFE, 0x3B82F6]
    for (let i = 0; i < 6; i++) {
      const sg = new THREE.SphereGeometry(0.4 + Math.random() * 0.6, 12, 12)
      const sm = new THREE.MeshBasicMaterial({
        color: sphereColors[i % sphereColors.length],
        transparent: true,
        opacity: 0.12 + Math.random() * 0.1,
        wireframe: true,
      })
      const mesh = new THREE.Mesh(sg, sm)
      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20
      )
      mesh.userData = { speed: 0.004 + Math.random() * 0.006, offset: Math.random() * Math.PI * 2 }
      scene.add(mesh)
      spheres.push(mesh)
    }

    // Mouse parallax
    let mouseX = 0, mouseY = 0
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    // Resize
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // Animate
    let frameId
    let t = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      t += 0.01

      particles.rotation.y = t * 0.025 + mouseX * 0.05
      particles.rotation.x = t * 0.015 + mouseY * 0.03

      spheres.forEach((s, i) => {
        s.rotation.x += s.userData.speed * 0.7
        s.rotation.y += s.userData.speed
        s.position.y += Math.sin(t * 0.5 + s.userData.offset) * 0.01
      })

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02
      camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.02

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
