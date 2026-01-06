import { PUBLIC_GAS_URL } from '$env/static/public';

// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import type { Project } from '$lib/types'; // 인터페이스를 공통 파일로 뺐다고 가정

export const load: PageServerLoad = async ({ fetch }) => {
  // 배포한 GAS 웹 앱 URL을 입력하세요
  try {
    const response = await fetch(PUBLIC_GAS_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const projects: Project[] = await response.json();
    return {
      projects
    };
  } catch (error) {
    console.error('GAS Fetch Error:', error);
    return {
      projects: [],
      error: '데이터를 불러오는 중 오류가 발생했습니다.'
    };
  }
};