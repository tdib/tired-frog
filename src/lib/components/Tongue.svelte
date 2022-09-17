<script>
  import { onMount } from 'svelte'

  export let targetPos
  let startPos

  let tongueElement
  onMount(() => {
    tongueElement = document.querySelector('.tongue')?.getBoundingClientRect()
    startPos = [tongueElement.x, tongueElement.y+16]
    window.addEventListener('resize', () => {
      tongueElement = document.querySelector('.tongue')?.getBoundingClientRect()
      startPos = [tongueElement.x, tongueElement.y+16]
    })
  })

  let targetAngle = 0
  let targetDist = 0
  $: {
    if (targetPos && startPos) {
      targetAngle = Math.atan2(targetPos[1] - startPos[1], targetPos[0] - startPos[0]) * (180 / Math.PI)
      targetDist = Math.sqrt(Math.pow(targetPos[1]-startPos[1], 2) + Math.pow(targetPos[0]-startPos[0], 2))
      window.setTimeout(() => {
        targetDist = 0
      }, 125)
    }
  }
</script>

<div class='tongue' style='--target-angle: {targetAngle}deg; --target-dist: {targetDist}px'></div>

<style>
  .tongue {
    z-index: 1;
    transition: width .125s ease-out, transform .05s ease-out;
    position: absolute;
    transform-origin: left 1em;
    background-color: hsl(3, 45%, 70%);
    width: var(--target-dist);
    height: 2em;
    border-radius: 0.85em;
    top: 53%;
    left: 50%;
    transform: rotate(var(--target-angle));
  }
</style>