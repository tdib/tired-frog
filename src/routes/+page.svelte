<script>
  import front from '$lib/assets/front.png'
  import frontEvil from '$lib/assets/front-evil.png'
  import back from '$lib/assets/back.png'
  import Fly from '$lib/components/Fly.svelte'
  import Tongue from '$lib/components/Tongue.svelte'
  import { onMount } from 'svelte'

  let currImg = front

  const eatGlob = import.meta.glob('$lib/assets/eat/*.mp3', { eager: true })
  const eatPaths = Object.values(eatGlob).map((path) => path.default)

  let numFlies = 12
  let numMurdered = 0
  let targetPos

  onMount(() => {
    document.addEventListener('click', (e) => {
      targetPos = [e.clientX, e.clientY]
    })
  })

  function murderAnotherFamily() {
    console.log('You horrible human.');
    numMurdered++
    if (Math.random() > 0.5) numFlies++
    if (numMurdered >= 100 && currImg === front) currImg = frontEvil
  }

  function handlePhrogClick() {
    currImg = currImg === front ? back : front
    if (numMurdered >= 100 && currImg === front) currImg = frontEvil
    // Play a random eat sound
    const randomEat = eatPaths[Math.floor(Math.random() * eatPaths.length)]
    const randomEatAudio = new Audio(randomEat)
    randomEatAudio.play()
  }
</script>

<div class='sky'>
  <h1>Tired Frog - A "game" by Dib</h1>
  <h2>You have murdered {numMurdered} flies and families!</h2>

  {#each Array(numFlies) as i}
    <Fly killFlyFn={murderAnotherFamily}/>
  {/each}

  <div class='phrog-container'>
    <Tongue targetPos={targetPos} />
    <img
      class='phrog'
      src={currImg}
      style='z-index: {currImg === back ? 2 : 0}'
      draggable='false'
      alt='A good looking frog that has not slept in 3 days'
      on:click|stopPropagation={handlePhrogClick}
    />
  </div>
</div>

<style>
  .sky {
    background-color: hsl(201deg, 90%, 84%);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .phrog-container {
    position: absolute;
    left: 20%;
    bottom: 0;
    width: 20em;
  }

  .phrog {
    display: block;
    width: 100%;
    image-rendering: pixelated;
    position: relative;
  }
</style>
