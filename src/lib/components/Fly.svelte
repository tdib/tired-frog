<script>
  import fly from '$lib/assets/fly.png'

  const buzzingGlob = import.meta.glob('$lib/assets/buzzing/*.mp3', { eager: true })
  const buzzingPaths = Object.values(buzzingGlob).map((path) => path.default)

  const deathGlob = import.meta.glob('$lib/assets/death/*.mp3', { eager: true })
  const deathPaths = Object.values(deathGlob).map((path) => path.default)

  export let killFlyFn
  // Choose a random size for the fly (up to 5em)
  const size = `${Math.ceil(Math.random() * 5)}em`

  // Choose random location off the right side of the screen
  let yOffset = Math.floor(Math.random() * 50)
  let xOffset = 100 + Math.floor(Math.random() * 100)

  // 10 times a second, adjust the position of flies
  setInterval(() => {
    xOffset -= 1
    // When fly goes past the left side, teleport back to a random
    // location on the right
    if (xOffset < 0 - size*2) {
      xOffset = 100 + Math.floor(Math.random() * size*5)
      yOffset = Math.floor(Math.random() * 60)
    }
  }, 100)

  function murderFlyAndItsFamily() {
    // Move the fly back to the right of the screen and increment counter
    xOffset = 100 + Math.floor(Math.random() * 40)
    killFlyFn()

    // Play a random death sound
    const randomDeath = deathPaths[Math.floor(Math.random() * deathPaths.length)]
    const randomDeathAudio = new Audio(randomDeath)
    randomDeathAudio.play()

    // Play a random buzz sound
    const randomBuzz = buzzingPaths[Math.floor(Math.random() * buzzingPaths.length)]
    const randomBuzzAudio = new Audio(randomBuzz)
    randomBuzzAudio.volume = 0.4
    randomBuzzAudio.play()
    randomBuzzAudio.addEventListener('ended', function () {
      this.currentTime = 0
      this.play()
    })

  }
</script>

<img
  src={fly}
  draggable='false'
  style='--size: {size}; --y-offset: {yOffset}%; --x-offset: {xOffset}%'
  alt='A good looking fly that will eat your family'
  on:click={murderFlyAndItsFamily}
/>

<style>
  img {
    position: absolute;
    width: var(--size);
    height: var(--size);
    top: var(--y-offset);
    left: var(--x-offset);
    image-rendering: pixelated;
  }

  :hover {
    cursor: pointer;
  }

</style>
