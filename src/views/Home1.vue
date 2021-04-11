<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <van-button>555</van-button>
    <!-- <van-checkbox v-model="check"></van-checkbox> -->
    <test></test>
  </div>
</template>

<script lang="ts">
import { Options, Vue} from 'vue-class-component';
import Test from './Test.vue'

@Options({
  components: {
    Test
  },
})

export default class Home extends Vue {
  // check: boolean = false

  
}
</script>
