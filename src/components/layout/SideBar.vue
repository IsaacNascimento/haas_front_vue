<template>
  <div>
    <button class="btn-open--sidebar" v-b-toggle.sidebar-no-header>
      <b-icon class="icon-btn" icon="list" aria-hidden="true" variant="dark"></b-icon>
    </button>
    <b-sidebar
      bg-variant="dark"
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      no-header
      backdrop
      shadow
    >
      <template #default="{ hide }">
        <div class="p-3" id="text-sidebar">
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide">Active</b-nav-item>
              <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
              <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
            </b-nav>
          </nav>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "SideBar",
};
</script>

<style>
h4, p {
    color: #fff;
}

.btn-open--sidebar {
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}

.icon-btn {
  margin-top: 15px;
  margin-left: 15px;
}

</style>
