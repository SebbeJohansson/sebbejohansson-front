import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Localization from '~/store/localizationmodule'

let localizationStore: Localization

function initialiseStores(store: Store<any>): void {
  localizationStore = getModule(Localization, store)
}

export { initialiseStores, localizationStore }