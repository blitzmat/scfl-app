<template>
    <div>
        <h1>Home</h1>
        <hr class="my-3" />
        <h2>Upcoming marjor tournaments</h2>
        <div v-if="tournaments">
            <ul>
                <li v-for="tournament in tournaments">
                    {{tournament.tier}} - {{tournament.title}} | {{tournament.start}} - {{tournament.end}}
                </li>
            </ul>
        </div>
    </div>  
</template>

<script>
export default {
    name: 'Home',
    auth: false,
    data() {
        return {
            tournaments: []
        }
    },
    async fetch() {
        this.tournaments = await this.$store.dispatch('tournament/fetch', {tier: 'Premier'})
        console.log(this.tournaments)
    },
}
</script>
