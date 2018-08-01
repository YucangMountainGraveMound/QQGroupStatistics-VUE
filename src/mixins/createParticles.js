export const createParticles = {
  methods: {
    initParticles() {
      const DAT = DAT || {}

      DAT.Particle = function (container) {

        let camera, scene, renderer, group, particle
        let mouseX = 0, mouseY = 0
        let windowHalfX = window.innerWidth / 2
        let windowHalfY = window.innerHeight / 2

        init()
        this.animate = animate

        function init() {
          camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000)
          camera.position.z = 1000
          scene = new THREE.Scene()
          group = new THREE.Group()
          scene.add(group)

          var texture = new THREE.TextureLoader().load("/static/images/huaji.png")
          for (let i = 0; i < 1000; i++) {
            let material = new THREE.SpriteMaterial({
              map: texture
            })
            particle = new THREE.Sprite(material)
            particle.position.x = Math.random() * 2000 - 1000
            particle.position.y = Math.random() * 2000 - 1000
            particle.position.z = Math.random() * 2000 - 1000
            particle.scale.x = particle.scale.y = Math.random() * 40 + 10
            group.add(particle)
          }
          renderer = new THREE.CanvasRenderer()
          renderer.setPixelRatio(window.devicePixelRatio)
          renderer.setSize(window.innerWidth, window.innerHeight)
          renderer.setClearColor(0xf5f7f9, 1.0)
          container.appendChild(renderer.domElement)
          document.addEventListener('mousemove', onDocumentMouseMove, false)
          document.addEventListener('touchstart', onDocumentTouchStart, false)
          document.addEventListener('touchmove', onDocumentTouchMove, false)
          window.addEventListener('resize', onWindowResize, false)
        }

        function onWindowResize() {
          windowHalfX = window.innerWidth / 2
          windowHalfY = window.innerHeight / 2
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }

        function onDocumentMouseMove(event) {
          mouseX = event.clientX - windowHalfX
          mouseY = event.clientY - windowHalfY
        }

        function onDocumentTouchStart(event) {
          if (event.touches.length === 1) {
            event.preventDefault()
            mouseX = event.touches[0].pageX - windowHalfX
            mouseY = event.touches[0].pageY - windowHalfY
          }
        }

        function onDocumentTouchMove(event) {
          if (event.touches.length === 1) {
            event.preventDefault()
            mouseX = event.touches[0].pageX - windowHalfX
            mouseY = event.touches[0].pageY - windowHalfY
          }
        }

        function animate() {
          requestAnimationFrame(animate)
          render()
        }

        function render() {
          camera.position.x += (mouseX - camera.position.x) * 0.05
          camera.position.y += (-mouseY - camera.position.y) * 0.05
          camera.lookAt(scene.position)
          group.rotation.x += 0.01
          group.rotation.y += 0.02
          renderer.render(scene, camera)
        }

      }

      const container = document.getElementById('huaji')
      const particle = new DAT.Particle(container)

      particle.animate()
    }
  },
  mounted() {
    this.initParticles()
  }
}
