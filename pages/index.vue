<template>
    <div>
        <h1>Home</h1>
        <hr class="my-3" />
        <C_Loading v-if="loading" />
        <section v-else>
            <nav class="tabs flex flex-wrap" ref="tabs">
                <span data-name="tournaments" class="p-5 cursor-pointer dark:bg-slate-700 hover:bg-slate-200" :class="(tabList && tabList.tournaments.isActive ? 'bg-slate-200 dark:bg-slate-500' : 'bg-slate-300')" @click="toggleActive('tournaments')">Tournaments</span>
                <span data-name="series" class="p-5 cursor-pointer dark:bg-slate-700 hover:bg-slate-200" :class="(tabList && tabList.series.isActive ? 'bg-slate-200 dark:bg-slate-500' : 'bg-slate-300')" @click="toggleActive('series')">Series</span>
            </nav>
            <div class="flex flex-wrap dark:bg-slate-500 bg-slate-200">
                <div class="w-1/2">
                    <C_Tournament v-if="tabList && tabList.tournaments.isActive"/>
                    <C_Series v-if="tabList && tabList.series.isActive"/>
                </div>
            </div>
        </section>
    </div>  
</template>

<script>
import C_Loading from '../components/C_Loading.vue'
import C_Tournament from '../components/C_Tournament.vue'
import C_Series from '../components/C_Series.vue'

export default {
    name: 'Home',
    auth: false,
    components: {
        C_Loading,
        C_Tournament,
        C_Series
    },
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
