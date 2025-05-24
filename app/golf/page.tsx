// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { Howl } from 'howler'

// // Our color palette based on core values
// const palette = {
//   yellow: '#FFD300', // suksess
//   green: '#00C853',  // penger
//   blue: '#2962FF',   // prestasjon
//   orange: '#FF6D00', // lounge
//   pink: '#FF4081',   // gutta
//   purple: '#651FFF', // stemning
//   black: '#000000',  // pure trøkk
//   red: '#D50000',    // lidenskap
//   brown: '#795548',  // ekte
//   cyan: '#00E5FF',   // regelbryting
//   gold: '#FFD700',   // premium feel
//   neon: '#39FF14'    // energi
// }

// // Type definitions for game objects
// type ItemType = 'boost' | 'drag' | 'superBoost' | 'goldBoost' | 'multiBoost'

// interface GameItem {
//   x: number
//   y: number
//   type: ItemType
//   hit?: boolean
//   rotation?: number
//   scale?: number
// }

// interface TrailPoint {
//   x: number
//   y: number
//   age: number
// }

// interface Particle {
//   x: number
//   y: number
//   vx: number
//   vy: number
//   life: number
//   color: string
// }

// interface GameBall {
//   x: number
//   y: number
//   vx: number
//   vy: number
//   r: number
//   trail: TrailPoint[]
//   spin?: number
//   particles?: Particle[]
// }

// interface Cloud {
//   x: number
//   y: number
//   width: number
//   speed: number
// }        // Check for item collisions
//         items.forEach(it => {
//           const hitDistance = it.type === 'superBoost' || it.type === 'goldBoost' ? 25 : 15
          
//           if (ball && !it.hit && Math.abs(ball.x - it.x) < hitDistance && Math.abs(ball.y - it.y) < hitDistance) {
//             it.hit = true
            
//             // Different effects based on item typember
// }

// interface TrailPoint {
//   x: number
//   y: number
//   age: number
// }

// interface Particle {
//   x: number
//   y: number
//   vx: number
//   vy: number
//   life: number
//   color: string
// }

// interface GameBall {
//   x: number
//   y: number
//   vx: number
//   vy: number
//   r: number
//   trail: TrailPoint[]
//   spin?: number
//   particles?: Particle[]
// }

// interface Cloud {
//   x: number
//   y: number
//   width: number
//   speed: number
// }

// export default function GolfPage() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null)
//   const [status, setStatus] = useState('Klikk for å starte slaget')
//   const [highScore, setHighScore] = useState(0)
//   const [currentScore, setCurrentScore] = useState(0)
//   const [soundEnabled, setSoundEnabled] = useState(true)
//   const animationFrameRef = useRef<number>(0)
//   const audioRef = useRef<{
//     swing: Howl;
//     boost: Howl;
//     drag: Howl;
//     bounce: Howl;
//     applause: Howl;
//     superBoost: Howl;
//   } | null>(null)
  
//   // Load sounds - using free sound effects from open sources
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       audioRef.current = {
//         swing: new Howl({ src: ['https://assets.codepen.io/21542/swoosh.mp3'], volume: 0.5 }),
//         boost: new Howl({ src: ['https://assets.codepen.io/21542/pop.mp3'], volume: 0.5 }),
//         drag: new Howl({ src: ['https://assets.codepen.io/21542/thud.mp3'], volume: 0.3 }),
//         bounce: new Howl({ src: ['https://assets.codepen.io/21542/boing.mp3'], volume: 0.2 }),
//         applause: new Howl({ src: ['https://assets.codepen.io/21542/applause.mp3'], volume: 0.4 }),
//         superBoost: new Howl({ src: ['https://assets.codepen.io/21542/powerup.mp3'], volume: 0.6 })
//       }
//     }
    
//     // Capture reference for cleanup
//     const animFrameRef = animationFrameRef.current;
//     return () => {
//       if (animFrameRef) {
//         cancelAnimationFrame(animFrameRef)
//       }
//     }
//   }, [])

//   useEffect(() => {
//     setHighScore(Number(localStorage.getItem('golfHighScore') || 0))
//   }, [])

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    
//     // Store animation frame reference for cleanup
//     let animFrameId: number;
    
//     const resize = () => {
//       canvas.width = window.innerWidth
//       canvas.height = window.innerHeight * 0.7
//     }
//     resize()
//     window.addEventListener('resize', resize)

//     let state: 'aim' | 'power' | 'flight' | 'end' = 'aim'
//     let angle = Math.PI / 4
//     let power = 0
//     let t = 0
//     let ball: GameBall | null = null
    
//     let cameraX = 0
//     const maxPower = 40
//     const gravity = 9.81 / 4
//     const currentDistance = 0
    
//     // Background elements
//     const clouds: Cloud[] = []
//     for (let i = 0; i < 8; i++) {
//       clouds.push({
//         x: Math.random() * 5000,
//         y: -200 - Math.random() * 100,
//         width: 100 + Math.random() * 150,
//         speed: 0.2 + Math.random() * 0.3
//       })
//     }
    
//     // Game items with different power-ups
//     const items: GameItem[] = []
    
//     const itemSpacing = 500
//     for (let i = 1; i <= 40; i++) {
//       const rnd = Math.random()
//       let type: 'boost' | 'drag' | 'superBoost' | 'goldBoost' | 'multiBoost' = 'boost'
      
//       if (rnd < 0.5) {
//         type = 'boost'
//       } else if (rnd < 0.8) {
//         type = 'drag'
//       } else if (rnd < 0.9) {
//         type = 'superBoost'
//       } else if (rnd < 0.95) {
//         type = 'goldBoost'
//       } else {
//         type = 'multiBoost'
//       }
      
//       items.push({
//         x: i * itemSpacing + Math.random() * (itemSpacing * 0.8),
//         y: -50 - Math.random() * 150,
//         type: type,
//         rotation: 0,
//         scale: 1
//       })
//     }

//     const createParticles = (x: number, y: number, count: number, colors: string[]) => {
//       const particles: {x: number; y: number; vx: number; vy: number; life: number; color: string}[] = [];
//       for (let i = 0; i < count; i++) {
//         particles.push({
//           x,
//           y, 
//           vx: (Math.random() - 0.5) * 15,
//           vy: (Math.random() - 0.5) * 15,
//           life: 0.5 + Math.random() * 0.5,
//           color: colors[Math.floor(Math.random() * colors.length)]
//         });
//       }
//       return particles;
//     }

//     // Launch the ball with fancy effects
//     const launch = () => {
//       if (audioRef.current) {
//         audioRef.current.swing.play();
//       }
      
//       ball = {
//         x: 0,
//         y: -10,
//         vx: Math.cos(angle) * power,
//         vy: -Math.sin(angle) * power,
//         r: 10,
//         trail: [],
//         spin: (Math.random() - 0.5) * 0.1,
//         particles: createParticles(0, -10, 15, [palette.yellow, palette.orange, palette.red])
//       }
      
//       state = 'flight'
//       setStatus('')
//       // Track current score to show progress
//       setCurrentScore(0)
//     }

//     // Handle user interactions
//     const handleClick = () => {
//       if (state === 'aim') {
//         state = 'power'
//         // Show helpful message
//         setStatus('Klikk for å bestemme kraften!')
//       }
//       else if (state === 'power') {
//         launch()
//       }
//       else if (state === 'end') {
//         // Reset game state
//         state = 'aim'
//         cameraX = 0
//         t = 0
//         angle = Math.PI / 4
//         power = 0
//         setStatus('Klikk for å starte slaget')
//       }
//     }
    
//     // Support touch devices
//     canvas.addEventListener('click', handleClick)
//     canvas.addEventListener('touchstart', (e) => {
//       e.preventDefault()
//       handleClick()
//     })

//     // Draw clouds in the background
//     const drawClouds = () => {
//       ctx.fillStyle = '#ffffff'
//       clouds.forEach(cloud => {
//         const sx = cloud.x - cameraX * 0.3 // Parallax effect
//         const sy = canvas.height + cloud.y
        
//         // Skip if off screen
//         if (sx < -cloud.width || sx > canvas.width + cloud.width) return
        
//         ctx.beginPath()
//         ctx.arc(sx, sy, cloud.width * 0.5, 0, Math.PI * 2)
//         ctx.arc(sx + cloud.width * 0.3, sy - cloud.width * 0.1, cloud.width * 0.4, 0, Math.PI * 2)
//         ctx.arc(sx + cloud.width * 0.4, sy + cloud.width * 0.1, cloud.width * 0.3, 0, Math.PI * 2)
//         ctx.arc(sx - cloud.width * 0.3, sy + cloud.width * 0.05, cloud.width * 0.35, 0, Math.PI * 2)
//         ctx.fill()
        
//         // Move clouds slowly
//         cloud.x -= cloud.speed
//         if (cloud.x < -cloud.width - 1000) {
//           cloud.x = 5000 + Math.random() * 1000
//         }
//       })
//     }

//     // Draw fancy aiming circle
//     const drawQuarterCircle = () => {
//       const radius = 80
//       const cx = 100 - cameraX
//       const cy = canvas.height - 80
      
//       // Sweet spot indicator
//       const sweetAngle = Math.PI + Math.PI/4
//       ctx.beginPath()
//       ctx.arc(cx, cy, radius, sweetAngle - 0.1, sweetAngle + 0.1)
//       ctx.strokeStyle = palette.gold
//       ctx.lineWidth = 8
//       ctx.stroke()
      
//       // Main arc
//       ctx.beginPath()
//       ctx.arc(cx, cy, radius, Math.PI, Math.PI * 1.5)
//       const gradient = ctx.createLinearGradient(
//         cx - radius, cy - radius, cx + radius, cy
//       )
//       gradient.addColorStop(0, palette.blue)
//       gradient.addColorStop(0.5, palette.purple)
//       gradient.addColorStop(1, palette.cyan)
//       ctx.strokeStyle = gradient
//       ctx.lineWidth = 4
//       ctx.stroke()
      
//       // Aiming pointer with animation
//       const pointerAngle =
//         state === 'aim'
//           ? Math.PI + Math.sin(t * 2) * (Math.PI / 4)
//           : Math.PI + angle
          
//       // Draw pulsing glow for aim pointer in aim state
//       if (state === 'aim') {
//         ctx.beginPath()
//         ctx.moveTo(cx, cy)
//         ctx.lineTo(
//           cx + radius * Math.cos(pointerAngle),
//           cy + radius * Math.sin(pointerAngle)
//         )
//         ctx.lineWidth = 12 + Math.sin(t * 5) * 4
//         ctx.strokeStyle = 'rgba(255, 211, 0, 0.3)'
//         ctx.stroke()
//       }
      
//       // Actual pointer
//       ctx.beginPath()
//       ctx.moveTo(cx, cy)
//       ctx.lineTo(
//         cx + radius * Math.cos(pointerAngle),
//         cy + radius * Math.sin(pointerAngle)
//       )
//       ctx.strokeStyle = palette.yellow
//       ctx.lineWidth = 6
//       ctx.stroke()
      
//       // Add a "golfer" silhouette
//       ctx.fillStyle = palette.black
//       ctx.beginPath()
//       ctx.arc(cx - 15, cy - 5, 8, 0, Math.PI * 2)  // Head
//       ctx.fill()
//       ctx.beginPath()
//       ctx.moveTo(cx - 15, cy + 3)
//       ctx.lineTo(cx - 15, cy + 25)  // Body
//       ctx.lineWidth = 4
//       ctx.stroke()
      
//       // Draw club based on state
//       if (state === 'aim' || state === 'power') {
//         const clubAngle = pointerAngle - Math.PI/4
//         ctx.beginPath()
//         ctx.moveTo(cx - 15, cy + 10)
//         ctx.lineTo(
//           cx - 15 + 40 * Math.cos(clubAngle),
//           cy + 10 + 40 * Math.sin(clubAngle)
//         )
//         ctx.strokeStyle = palette.black
//         ctx.lineWidth = 2
//         ctx.stroke()
//       }
//     }

//     // Enhanced power bar with gradient and animations
//     const drawPowerBar = () => {
//       const barWidth = 25
//       const maxHeight = 160
//       const cx = 180 - cameraX
//       const cy = canvas.height - 20
      
//       // Bar outline
//       ctx.strokeStyle = 'rgba(0,0,0,0.3)'
//       ctx.lineWidth = 6
//       ctx.strokeRect(cx, cy - maxHeight, barWidth, maxHeight)
      
//       // Bar fill with gradient
//       const gradient = ctx.createLinearGradient(cx, cy, cx, cy - maxHeight)
//       gradient.addColorStop(0, palette.green)
//       gradient.addColorStop(0.7, palette.yellow)
//       gradient.addColorStop(1, palette.red)
      
//       const h =
//         state === 'power'
//           ? Math.abs(Math.sin(t * 3)) * maxHeight
//           : (power / maxPower) * maxHeight
          
//       ctx.fillStyle = gradient
//       ctx.fillRect(cx, cy - h, barWidth, h)
      
//       // Power indicators
//       const totalLines = 5
//       const lineHeight = maxHeight / totalLines
      
//       for (let i = 1; i < totalLines; i++) {
//         ctx.beginPath()
//         ctx.moveTo(cx, cy - i * lineHeight)
//         ctx.lineTo(cx + barWidth, cy - i * lineHeight)
//         ctx.strokeStyle = 'rgba(0,0,0,0.3)'
//         ctx.lineWidth = 2
//         ctx.stroke()
//       }
      
//       // Add "power" label
//       ctx.save()
//       ctx.translate(cx + barWidth + 15, cy - maxHeight/2)
//       ctx.rotate(-Math.PI/2)
//       ctx.fillStyle = palette.black
//       ctx.font = 'bold 16px Arial'
//       ctx.fillText('POWER', 0, 0)
//       ctx.restore()
      
//       // Add power level indicator
//       if (state === 'power') {
//         const powerLevel = Math.floor((h / maxHeight) * 100)
//         ctx.font = 'bold 16px Arial'
//         ctx.fillStyle = palette.black
//         ctx.fillText(`${powerLevel}%`, cx - 50, cy - h + 5)
//       }
//     }

//     // Draw various game items with animation effects
//     const drawItems = () => {
//       items.forEach(it => {
//         if (!it.scale) it.scale = 1;
//         if (!it.rotation) it.rotation = 0;
        
//         // Only render items in view
//         const sx = it.x - cameraX
//         const sy = canvas.height + it.y
        
//         if (sx < -50 || sx > canvas.width + 50) return
        
//         // Animate items
//         it.rotation! += 0.02
//         it.scale = 0.9 + Math.sin(t * 2) * 0.1
        
//         ctx.save()
//         ctx.translate(sx, sy)
//         ctx.rotate(it.rotation!)
//         ctx.scale(it.scale, it.scale)
        
//         // Different visuals for different powerup types
//         if (it.type === 'boost') {
//           // Orange circle boost
//           ctx.fillStyle = palette.orange
//           ctx.beginPath()
//           ctx.arc(0, 0, 12, 0, Math.PI * 2)
//           ctx.fill()
          
//           // Arrow inside
//           ctx.beginPath()
//           ctx.moveTo(-6, -5)
//           ctx.lineTo(6, 0)
//           ctx.lineTo(-6, 5)
//           ctx.closePath()
//           ctx.fillStyle = '#fff'
//           ctx.fill()
          
//         } else if (it.type === 'drag') {
//           // Red square drag
//           ctx.fillStyle = palette.red
//           ctx.fillRect(-12, -12, 24, 24)
          
//           // X symbol
//           ctx.beginPath()
//           ctx.moveTo(-6, -6)
//           ctx.lineTo(6, 6)
//           ctx.moveTo(6, -6)
//           ctx.lineTo(-6, 6)
//           ctx.strokeStyle = '#fff'
//           ctx.lineWidth = 3
//           ctx.stroke()
          
//         } else if (it.type === 'superBoost') {
//           // Cyan star super boost
//           ctx.fillStyle = palette.cyan
//           const points = 5
//           const outerRadius = 15
//           const innerRadius = 7
          
//           ctx.beginPath()
//           for (let i = 0; i < points * 2; i++) {
//             const radius = i % 2 === 0 ? outerRadius : innerRadius
//             const angle = (i * Math.PI) / points
//             ctx.lineTo(
//               Math.cos(angle) * radius,
//               Math.sin(angle) * radius
//             )
//           }
//           ctx.closePath()
//           ctx.fill()
          
//           // Glow effect
//           ctx.shadowColor = palette.cyan
//           ctx.shadowBlur = 5 + Math.sin(t * 5) * 5
//           ctx.shadowOffsetX = 0
//           ctx.shadowOffsetY = 0
//           ctx.fill()
          
//         } else if (it.type === 'goldBoost') {
//           // Gold coin
//           const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 15)
//           gradient.addColorStop(0, palette.yellow)
//           gradient.addColorStop(1, palette.gold)
          
//           ctx.fillStyle = gradient
//           ctx.beginPath()
//           ctx.arc(0, 0, 15, 0, Math.PI * 2)
//           ctx.fill()
          
//           // $ symbol
//           ctx.fillStyle = '#fff'
//           ctx.font = 'bold 16px Arial'
//           ctx.textAlign = 'center'
//           ctx.textBaseline = 'middle'
//           ctx.fillText('$', 0, 0)
          
//         } else if (it.type === 'multiBoost') {
//           // Purple diamond multi-boost
//           ctx.fillStyle = palette.purple
          
//           ctx.beginPath()
//           ctx.moveTo(0, -18)
//           ctx.lineTo(18, 0)
//           ctx.lineTo(0, 18)
//           ctx.lineTo(-18, 0)
//           ctx.closePath()
//           ctx.fill()
          
//           // Shiny effect
//           ctx.beginPath()
//           ctx.moveTo(-5, -5)
//           ctx.lineTo(5, 5)
//           ctx.strokeStyle = '#fff'
//           ctx.lineWidth = 3
//           ctx.stroke()
//         }
        
//         // If item has been hit, add a "hit" indicator
//         if (it.hit) {
//           ctx.strokeStyle = 'rgba(255,255,255,0.7)'
//           ctx.lineWidth = 3
//           ctx.beginPath()
//           ctx.arc(0, 0, 20, 0, Math.PI * 2)
//           ctx.stroke()
//         }
        
//         ctx.restore()
//       })
//     }

//     // Draw gradient sky background
//     const drawBackground = () => {
//       const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
//       skyGradient.addColorStop(0, '#87CEEB') // Sky blue at top
//       skyGradient.addColorStop(1, '#E0F7FA') // Lighter blue near ground
      
//       ctx.fillStyle = skyGradient
//       ctx.fillRect(0, 0, canvas.width, canvas.height)
      
//       // Draw clouds
//       drawClouds()
      
//       // Draw ground with grass
//       const groundGradient = ctx.createLinearGradient(0, canvas.height - 20, 0, canvas.height)
//       groundGradient.addColorStop(0, palette.green)
//       groundGradient.addColorStop(1, palette.brown)
      
//       ctx.fillStyle = groundGradient
//       ctx.fillRect(0, canvas.height - 10, canvas.width, 10)
      
//       // Draw distance markers
//       const markerSpacing = 500
//       for (let i = 0; i < 20; i++) {
//         const x = i * markerSpacing - cameraX
        
//         // Skip if off screen
//         if (x < -50 || x > canvas.width + 50) continue
        
//         ctx.fillStyle = 'rgba(255,255,255,0.7)'
//         ctx.fillRect(x, canvas.height - 25, 3, 15)
        
//         ctx.font = '12px Arial'
//         ctx.fillStyle = palette.black
//         ctx.textAlign = 'center'
//         ctx.fillText(`${i * 500}m`, x, canvas.height - 30)
//       }
//     }
    
//     // Draw ball trail and particles
//     const drawBallEffects = (ball: any) => {
//       // Draw trail
//       if (ball.trail && ball.trail.length > 1) {
//         ctx.beginPath()
//         ctx.moveTo(ball.trail[0].x - cameraX, canvas.height + ball.trail[0].y)
        
//         for (let i = 1; i < ball.trail.length; i++) {
//           ctx.lineTo(ball.trail[i].x - cameraX, canvas.height + ball.trail[i].y)
//         }
        
//         ctx.strokeStyle = 'rgba(255,255,255,0.3)'
//         ctx.lineWidth = 3
//         ctx.stroke()
//       }
      
//       // Draw particles
//       if (ball.particles && ball.particles.length > 0) {
//         ball.particles.forEach((p: any, i: number) => {
//           ctx.fillStyle = p.color
//           ctx.globalAlpha = p.life
//           ctx.beginPath()
//           ctx.arc(p.x - cameraX, canvas.height + p.y, 3, 0, Math.PI * 2)
//           ctx.fill()
          
//           // Update particles
//           p.x += p.vx * 0.1
//           p.y += p.vy * 0.1
//           p.life -= 0.02
          
//           // Remove dead particles
//           if (p.life <= 0) {
//             ball.particles!.splice(i, 1)
//           }
//         })
        
//         ctx.globalAlpha = 1
//       }
//     }
    
//     // Draw ball with decoration
//     const drawBall = (ball: any) => {
//       // Draw ball shadow
//       ctx.fillStyle = 'rgba(0,0,0,0.2)'
//       ctx.beginPath()
//       ctx.ellipse(
//         ball.x - cameraX,
//         canvas.height - ball.r * 0.5, 
//         ball.r * 1.5,
//         ball.r * 0.5,
//         0, 0, Math.PI * 2
//       )
//       ctx.fill()
      
//       // Draw ball
//       const ballGradient = ctx.createRadialGradient(
//         ball.x - cameraX - ball.r * 0.3,
//         canvas.height + ball.y - ball.r * 0.3,
//         0,
//         ball.x - cameraX,
//         canvas.height + ball.y,
//         ball.r * 1.2
//       )
//       ballGradient.addColorStop(0, '#FFFFFF')
//       ballGradient.addColorStop(1, palette.purple)
      
//       ctx.fillStyle = ballGradient
//       ctx.beginPath()
//       ctx.arc(ball.x - cameraX, canvas.height + ball.y, ball.r, 0, Math.PI * 2)
//       ctx.fill()
      
//       // Ball decoration - line pattern
//       if (ball.spin) {
//         const lineCount = 3
//         const lineAngle = t * ball.spin
        
//         for (let i = 0; i < lineCount; i++) {
//           const angle = lineAngle + (Math.PI * i) / lineCount
          
//           ctx.beginPath()
//           ctx.moveTo(
//             ball.x - cameraX,
//             canvas.height + ball.y
//           )
//           ctx.lineTo(
//             ball.x - cameraX + Math.cos(angle) * ball.r,
//             canvas.height + ball.y + Math.sin(angle) * ball.r
//           )
//           ctx.strokeStyle = palette.pink
//           ctx.lineWidth = 2
//           ctx.stroke()
//         }
//       }
      
//       // Glow effect for high-speed balls
//       if (Math.abs(ball.vx) > 15 || Math.abs(ball.vy) > 15) {
//         ctx.save()
//         ctx.beginPath()
//         ctx.arc(ball.x - cameraX, canvas.height + ball.y, ball.r * 1.5, 0, Math.PI * 2)
//         ctx.fillStyle = 'rgba(255,215,0,0.2)'
//         ctx.shadowColor = palette.yellow
//         ctx.shadowBlur = 10
//         ctx.fill()
//         ctx.restore()
//       }
//     }
    
//     // Main game update function
//     const step = (dt: number) => {
//       // Clear canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height)
      
//       // Draw background scene
//       drawBackground()
      
//       // Update game states
//       if (state === 'aim') {
//         angle = Math.PI / 4 + Math.sin(t * 2) * (Math.PI / 8)
//         drawQuarterCircle()
//       }
      
//       if (state === 'power') {
//         power = maxPower * Math.abs(Math.sin(t * 3))
//         drawQuarterCircle()
//         drawPowerBar()
//       }
      
//       // Draw items in all states except aim
//       if (state !== 'aim') {
//         drawItems()
//       }
      
//       // Flight state - ball is in motion
//       if (state === 'flight' && ball) {
//         // Physics update
//         ball.vy += gravity * dt
//         ball.x += ball.vx * dt
//         ball.y += ball.vy * dt
        
//         // Update current score for display
//         const currentDist = Math.floor(ball.x)
//         setCurrentScore(currentDist)
        
//         // Add to trail
//         if (ball.trail.length > 20) ball.trail.shift()
//         ball.trail.push({ x: ball.x, y: ball.y, age: 1.0 })
        
//         // Ground collision
//         if (ball.y >= -ball.r) {
//           ball.y = -ball.r
          
//           // Play bounce sound if velocity is high enough
//           if (Math.abs(ball.vy) > 3 && audioRef.current) {
//             audioRef.current.bounce.play()
//           }
          
//           // Bounce with friction
//           ball.vy *= -0.6
//           ball.vx *= 0.98
          
//           // Create dust particles on bounce
//           if (Math.abs(ball.vy) > 2) {
//             const bounceParticles = []
//             for (let i = 0; i < 8; i++) {
//               bounceParticles.push({
//                 x: ball.x,
//                 y: ball.y, 
//                 vx: (Math.random() - 0.5) * 5,
//                 vy: Math.random() * 5,
//                 life: 0.7 + Math.random() * 0.3,
//                 color: palette.brown
//               })
//             }
            
//             if (!ball.particles) ball.particles = []
//             ball.particles.push(...bounceParticles)
//           }
          
//           // End game if ball stops
//           if (Math.abs(ball.vy) < 0.5 && Math.abs(ball.vx) < 0.5) {
//             state = 'end'
//             const distance = Math.floor(ball.x)
            
//             // Play applause for good scores
//             if (distance > highScore * 0.7 && audioRef.current) {
//               audioRef.current.applause.play()
//             }
            
//             setStatus(`Distanse: ${distance} m${distance > highScore ? ' - NY REKORD!' : ''}`)
            
//             // Update high score if needed
//             if (distance > highScore) {
//               localStorage.setItem('golfHighScore', String(distance))
//               setHighScore(distance)
//             }
//           }
//         }
        
//         // Check for item collisions
//         items.forEach(it => {
//           const hitDistance = it.type === 'superBoost' || it.type === 'goldBoost' ? 25 : 15
          
//           if (!it.hit && Math.abs(ball.x - it.x) < hitDistance && Math.abs(ball.y - it.y) < hitDistance) {
//             it.hit = true
            
//             // Different effects based on item type
//             if (it.type === 'boost') {
//               ball.vx *= 1.2
//               ball.vy *= 0.9
//               if (audioRef.current) audioRef.current.boost.play()
              
//               // Create boost particles
//               if (!ball.particles) ball.particles = []
//               ball.particles.push(...createParticles(it.x, it.y, 15, [palette.orange, palette.yellow]))
              
//             } else if (it.type === 'drag') {
//               ball.vx *= 0.8
//               ball.vy *= 1.1
//               if (audioRef.current) audioRef.current.drag.play()
              
//               // Create drag particles
//               if (!ball.particles) ball.particles = []
//               ball.particles.push(...createParticles(it.x, it.y, 10, [palette.red, palette.black]))
              
//             } else if (it.type === 'superBoost') {
//               // Big speed boost
//               ball.vx *= 1.5
//               ball.vy *= 0.7
//               if (audioRef.current) audioRef.current.superBoost.play()
              
//               // Special effect particles
//               if (!ball.particles) ball.particles = []
//               ball.particles.push(...createParticles(it.x, it.y, 25, [palette.cyan, palette.blue, '#FFFFFF']))
              
//             } else if (it.type === 'goldBoost') {
//               // Gold gives ball upward momentum
//               ball.vx *= 1.3
//               ball.vy = -Math.max(15, Math.abs(ball.vy))
//               if (audioRef.current) audioRef.current.superBoost.play()
              
//               // Gold particles
//               if (!ball.particles) ball.particles = []
//               ball.particles.push(...createParticles(it.x, it.y, 20, [palette.gold, palette.yellow, '#FFFFFF']))
              
//             } else if (it.type === 'multiBoost') {
//               // Multi boost gives massive speed
//               ball.vx *= 1.8
//               ball.vy *= 0.5
//               if (audioRef.current) audioRef.current.superBoost.play()
              
//               // Rainbow particles
//               if (!ball.particles) ball.particles = []
//               ball.particles.push(...createParticles(it.x, it.y, 30, 
//                 [palette.purple, palette.pink, palette.blue, palette.green, palette.yellow, palette.red]))
//             }
//           }
//         })
        
//         // Update camera to follow ball
//         cameraX = Math.max(ball.x - canvas.width / 3, 0)
        
//         // Draw ball effects and ball
//         drawBallEffects(ball)
//         drawBall(ball)
//       }
      
//       // End state - game finished
//       if (state === 'end' && ball) {
//         drawBallEffects(ball)
//         drawBall(ball)
        
//         // Show "Try Again" message with animation
//         if (Math.floor(t * 2) % 2 === 0) {
//           ctx.font = 'bold 20px Arial'
//           ctx.fillStyle = palette.orange
//           ctx.textAlign = 'center'
//           ctx.fillText('Klikk for å slå igjen!', canvas.width / 2, 100)
//         }
//       }
      
//       // Draw scores
//       const scoreboardX = canvas.width - 220
//       const scoreboardY = 30
      
//       // Background for scores
//       ctx.fillStyle = 'rgba(255,255,255,0.7)'
//       ctx.roundRect(scoreboardX - 20, scoreboardY - 25, 220, 65, 10)
//       ctx.fill()
      
//       // Draw scores text
//       ctx.fillStyle = palette.black
//       ctx.font = 'bold 20px sans-serif'
//       ctx.textAlign = 'left'
//       ctx.fillText(`High Score: ${highScore} m`, scoreboardX, scoreboardY)
      
//       // Show current distance during flight
//       if (state === 'flight' || state === 'end') {
//         ctx.fillStyle = state === 'end' ? palette.green : palette.blue
//         ctx.fillText(`Distanse: ${currentScore} m`, scoreboardX, scoreboardY + 30)
//       }
      
//       // Draw sound toggle button
//       ctx.fillStyle = soundEnabled ? palette.green : palette.red
//       ctx.beginPath()
//       ctx.arc(40, 40, 20, 0, Math.PI * 2)
//       ctx.fill()
//       ctx.fillStyle = '#fff'
//       ctx.font = '16px Arial'
//       ctx.textAlign = 'center'
//       ctx.textBaseline = 'middle'
//       ctx.fillText(soundEnabled ? '🔊' : '🔇', 40, 40)
      
//       // Update time
//       t += dt
//       animFrameId = requestAnimationFrame(loop)
//     }

//     // Main game loop
//     let last = 0
//     const loop = (ts: number) => {
//       const dt = (ts - last) / 1000
//       last = ts
//       step(dt)
//     }
//     animFrameId = requestAnimationFrame(loop)
    
//     // Handle sound toggle
//     const handleSoundToggle = (e: MouseEvent) => {
//       const x = e.clientX - canvas.getBoundingClientRect().left
//       const y = e.clientY - canvas.getBoundingClientRect().top
      
//       // Check if click is on sound button
//       if (Math.sqrt(Math.pow(x - 40, 2) + Math.pow(y - 40, 2)) <= 20) {
//         setSoundEnabled(prev => !prev)
//         e.stopPropagation() // Prevent game click
//       }
//     }
    
//     canvas.addEventListener('mousedown', handleSoundToggle)

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', resize)
//       canvas.removeEventListener('click', handleClick)
//       canvas.removeEventListener('mousedown', handleSoundToggle)
//       canvas.removeEventListener('touchstart', handleClick as any)
//       if (animFrameId) {
//         cancelAnimationFrame(animFrameId)
//       }
//     }
//   }, [highScore, soundEnabled])

//   return (
//     <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-b from-yellow-400 via-green-300 to-pink-300">
//       <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">ROTFEST GOLF</h1>
//       <canvas ref={canvasRef} className="rounded-lg shadow-2xl border-4 border-yellow-400" />
//       <div className="mt-4 text-2xl font-bold text-center bg-white px-6 py-2 rounded-full shadow-lg">
//         {status}
//       </div>
      
//       <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
//         <div className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md">
//           Slå ballen så langt du kan! 🏌️‍♂️
//         </div>
//         <div className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md">
//           Bruk powerups! 🚀
//         </div>
//         <div className="px-4 py-2 bg-cyan-500 text-white rounded-lg shadow-md">
//           Unngå røde bremser! ❌
//         </div>
//       </div>
//     </div>
//   )
// }
