<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Content from '$lib/components/Content.svelte';
	import type { PageData } from './$types';

    export let data: PageData;
    
    // 서버에서 받아온 프로젝트 리스트
    $: projects = data.projects;

  let openedTitle: string | null = null;

  function toggle(title: string) {
    openedTitle = openedTitle === title ? null : title;
  }
</script>


<Hero />
<div class="container">
  <header class="list-header">
    <div class="col-year">YEAR</div>
    <div class="col-title">PROJECT_TITLE</div>
    <div class="col-category">CATEGORY</div>
    <div class="col-btn"></div>
  </header>

  {#each projects as p}
    <Content {p} openedTitle={openedTitle} toggle={toggle} />
  {/each}
</div>

<style>
  .container {
    width: 100%;
    border-top: 2px solid var(--line-color);
  }

  /* 리스트 헤더 */
  .list-header {
    display: flex;
    padding: 15px 20px;
    font-size: 11px;
    font-weight: 500;
    background: #f0f0f0;
    border-bottom: 1px solid var(--line-color);
  }

  /* 공통 컬럼 설정 */
  .col-year { width: 80px; }
  .col-title { flex: 1; display: flex; align-items: baseline; gap: 20px; }
  .col-category { width: 120px; text-align: right; }
  .col-btn { width: 100px; text-align: right; font-weight: 500; }
</style>