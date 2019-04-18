<template>
  <b-col href="#" v-on:click="selectCard">
    <div :class="colorClass">
      <img :src="poke.path" class="card-img-top" alt="Picture of Pokemon">
      <div class="card-body">
        <h2>{{poke.poke}}</h2>
        <p>Combat Power: {{poke.cp}}</p>
        <p>
          Type:
          <template v-for="type in poke.type">
            {{type}}
            {{' '}}
          </template>
        </p>
        <p v-if="poke.caught !=''">Place Caught: {{poke.caught}}</p>
      </div>
    </div>
  </b-col>
</template>

<script>
export default {
  name: "poke-card",
  props: {
    poke: Object,
    color: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      idNum: this.poke._id
    };
  },
  computed: {
    colorClass() {
      return "card trading_card" + " trade_" + this.color;
    }
  },
  methods: {
    selectCard() {
      console.log("Card selected ");
      if (this.color == "red") {
        this.$emit("edit-poke", this.poke);
        this.$root.$emit("bv::show::modal", "modal-1");
      } else {
        console.log("Other trainers pokeon selected");
      }
    }
  }
};
</script>

<style scoped>
.trading_card {
  margin: 15px 0px;
}

.trading_area {
  height: 400px;
  border-width: 3px !important;
  color: black;
}

.page_spacing {
  padding: 1rem;
}

.extra_margin {
  margin-top: 20px;
  margin-bottom: 20px;
}

.card-body h2 {
  text-align: center;
}
</style>


