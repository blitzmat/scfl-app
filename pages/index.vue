<template>
    <div>
        <h1>Home</h1>
        <hr class="my-3" />
        <Loading v-if="loading" />
        <section v-else>
            <nav class="tabs flex flex-wrap" ref="tabs">
                <span data-name="tournaments" class="p-5 cursor-pointer dark:bg-slate-700 hover:bg-slate-200" :class="(tabList && tabList.tournaments.isActive ? 'bg-slate-200 dark:bg-slate-500' : 'bg-slate-300')" @click="toggleActive('tournaments')">Tournaments</span>
                <span data-name="series" class="p-5 cursor-pointer dark:bg-slate-700 hover:bg-slate-200" :class="(tabList && tabList.series.isActive ? 'bg-slate-200 dark:bg-slate-500' : 'bg-slate-300')" @click="toggleActive('series')">Series</span>
            </nav>
            <div class="flex flex-wrap dark:bg-slate-500 bg-slate-200">
                <div class="w-1/2">
                    <Tournament v-if="tabList && tabList.tournaments.isActive"></Tournament>
                    <Series v-if="tabList && tabList.series.isActive"></Series>
                </div>
            </div>
        </section>
    </div>  
</template>

<script>
import Loading from '../components/Loading.vue'
import Tournament from '../components/Tournament.vue'
import Series from '../components/Series.vue'

export default {
    name: 'Home',
    auth: false,
    components: [
        Loading,
        Tournament,
        Series
    ],
    data() {
        return {
            loading: false,
            isActive: false,
            tabList: {
                tournaments: { isActive: false },
                series: { isActive: true }
            }
        }
    },

    methods: {
        toggleActive(name) {
            const tabsKeys = Object.keys(this.tabList)
            for (let i = 0; i < tabsKeys.length; i++) {
                this.tabList[tabsKeys[i]].isActive = false
            }
            this.tabList[name].isActive = true
        }
    },

}
</script>
