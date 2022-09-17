<script>
  import front from '$lib/assets/front.png'
  import frontEvil from '$lib/assets/front-evil.png'
  import back from '$lib/assets/back.png'
  import Fly from '$lib/components/Fly.svelte'
  import { onMount } from 'svelte'

  let currImg = front

  const eatGlob = import.meta.glob('$lib/assets/eat/*.mp3')
  const eatPaths = Object.keys(eatGlob)

  let numFlies = 12
  let numMurdered = 0

  onMount(() => {
    document.addEventListener('click', (e) => {
      console.log(e.clientX, e.clientY)
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
    const randomEatAudio = new Audio(new URL(randomEat, import.meta.url))
    randomEatAudio.play()
  }
</script>

<div class='sky'>
  <h1>Tired Frog - A "game" by Dib</h1>
  <h2>You have murdered {numMurdered} flies and families!</h2>

  {#each Array(numFlies) as i}
    <Fly killFlyFn={murderAnotherFamily}/>
  {/each}

  <img
    class='phrog'
    src={currImg}
    alt='A good looking frog that has not slept in 3 days'
    on:click={handlePhrogClick}
  />
</div>

<style lang='scss'>
  .sky {
    background-color: hsl(201deg, 90%, 84%);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .phrog {
    position: absolute;
    left: 20%;
    bottom: 0;
    width: 20em;
    image-rendering: pixelated;
  }

</style>
