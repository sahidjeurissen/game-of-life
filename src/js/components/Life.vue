<template>
    <div class="cell-grid" :style="{width: 10 * cols + 'px'}">
        <div class="cell-grid__cell" v-for="cell in life.cells"
             :key="cell.index"
             :class="{'cell-grid__cell--active' : cell.active}"
        >
        </div>
    </div>
</template>

<script>
    import Life from '@/js/life/Life';

    export default {
        name: 'Life',
        props: {
            autoplay: {
                default: true,
            },
            cols: {
                default: 150,
            },
            rows: {
                default: 150,
            },
        },
        data() {
            return {
                playing: false,
                life: null,
            };
        },
        watch: {
            playing() {
                if (this.playing) {
                    this.play();
                }
            },
        },
        methods: {
            play() {
                const startTime = new Date().getTime();
                this.life.nextGeneration();
                const endTime = new Date().getTime();

                const timeToGenerate = endTime - startTime;

                if (this.autoplay) {
                    this.playing = true;
                    window.setTimeout(this.play, 200 - timeToGenerate);
                }
            },
        },
        created() {
            this.life = new Life(this.cols, this.rows);

            this.play();
        },
    };
</script>

<style>

</style>
