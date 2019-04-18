<template>
  <div>
    <b-col>
      <div :class="colorClass">
        <img :src="poke.path" class="card-img-top" alt="Picture of Pokemon">
        <div class="card-body">
          <h2>{{poke.poke}}</h2>Combat Power:
          <b-input v-model="cp"/>
          <p></p>
          <p>
            Type:
            <template v-for="type in poke.type">
              {{type}}
              {{' '}}
            </template>
          </p>Place Caught:
          <b-input v-model="caught"/>
        </div>
      </div>
    </b-col>
    <b-row>
      <b-col class="text-right">
        <b-button variant="outline-dark" @click="cancelPoke">Cancel</b-button>
        <b-button variant="danger" @click="deletePoke">Delete</b-button>
        <b-button variant="dark" @click="updatePoke">Update</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "poke-edit",
  props: {
    poke: Object,
    color: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      place: "",
      combat: ""
    };
  },
  computed: {
    colorClass() {
      return "card trading_card" + " trade_" + this.color;
    },
    caught: {
      get() {
        if (this.place == "") {
          return this.poke.caught;
        } else {
          return this.place;
        }
      },
      set(val) {
        this.place = val;
      }
    },
    cp: {
      get() {
        if (this.combat == "") {
          return this.poke.cp;
        } else {
          return this.combat;
        }
      },
      set(val) {
        this.combat = val;
      }
    },
    idNum() {
      return this.poke._id;
    }
  },
  methods: {
    async deletePoke() {
      let that = this;
      this.$store.dispatch("deletePoke", this.idNum);
      that.combat = "";
      that.place = "";
      that.$emit("get-poke");
      this.$root.$emit("bv::hide::modal", "modal-1");
    },
    async updatePoke() {
      let that = this;
      let data = {
        idNum: that.idNum,
        cp: that.cp,
        caught: that.caught
      };
      this.$store.dispatch("updatePoke", data);
      that.combat = "";
      that.place = "";
      that.$emit("get-poke");
      that.$root.$emit("bv::hide::modal", "modal-1");
      return true;
    },
    cancelPoke() {
      this.$root.$emit("bv::hide::modal", "modal-1");
    }
  }
};
</script>
