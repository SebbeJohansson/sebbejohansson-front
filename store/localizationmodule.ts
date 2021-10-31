import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'localizationmodule',
  stateFactory: true,
  namespaced: true,
})
class Localization extends VuexModule {
}

export default Localization