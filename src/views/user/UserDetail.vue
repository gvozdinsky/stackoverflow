<template>
  <v-container fluid fill-height>
    <Loader :loading="loading">
      <v-layout>
        <v-flex xs2>
          <v-card class="py-2">
            <div class="text-xs-center">
              <div class="mb-1">
                <b>{{ name }}</b>
              </div>
              <div class="mb-2">
                <i v-html="location" />
              </div>
            </div>
            <v-img :src="image" height="200px" contain />
            <div class="mt-1 text-xs-center">
              <div>Reputation: <b>{{ reputation }}</b></div>
              <div>
                <v-chip label small color="yellow lighten-3">
                  {{ badges.gold }}
                </v-chip>
                <v-chip label small color="blue-grey lighten-3">
                  {{ badges.silver }}
                </v-chip>
                <v-chip label small color="orange lighten-3">
                  {{ badges.bronze }}
                </v-chip>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </Loader>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { USER_GET_ACTION } from '@/store/constants/actionTypes'
import Loader from '@/components/Loader'

export default {
  name: 'UserDetail',
  components: {
    Loader
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      userDetail: state => state.user.userDetail
    }),
    image () {
      return this.userDetail?.profile_image
    },
    reputation () {
      return this.userDetail?.reputation
    },
    badges () {
      return this.userDetail?.badge_counts || {}
    },
    name () {
      return this.userDetail?.display_name
    },
    location () {
      return this.userDetail?.location
    }
  },
  async created () {
    this.loading = true
    await this.getUser(this.id)
    this.loading = false
  },
  methods: {
    ...mapActions({
      getUser: USER_GET_ACTION
    })
  }
}
</script>
