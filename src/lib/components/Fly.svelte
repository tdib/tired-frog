<script>
  import fly from '$lib/assets/fly.png'
  import { onMount } from 'svelte'
  const buzzingGlob = import.meta.glob('$lib/assets/buzzing/*.wav', { eager: true })
  const buzzingPaths = Object.keys(buzzingGlob)
  const randomBuzz = buzzingPaths[Math.floor(Math.random() * buzzingPaths.length)]
  // let randomBuzzAudio
  // onMount(() => {
  //   randomBuzzAudio = new Audio(new URL(randomBuzz, import.meta.url))
  //   randomBuzzAudio.play()
  // })

  const deathGlob = import.meta.glob('$lib/assets/death/*.mp3')
  const deathPaths = Object.keys(deathGlob)

  export let killFlyFn
  // Choose a random size for the fly (up to 5em)
  const size = `${Math.ceil(Math.random() * 5)}em`

  // Choose random location off the right side of the screen
  let yOffset = Math.floor(Math.random() * 60)
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
    const randomDeathAudio = new Audio(new URL(randomDeath, import.meta.url))
    randomDeathAudio.play()

    // document.querySelector('#buzzing').play()

  }
</script>

<audio id='buzzing' loop>
  <source src={randomBuzz} />
</audio>

<img
  src={fly}
  style='--size: {size}; --y-offset: {yOffset}%; --x-offset: {xOffset}%'
  alt='A good looking fly that will eat your family'
  on:click={murderFlyAndItsFamily}
/>

<style lang='scss'>
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
