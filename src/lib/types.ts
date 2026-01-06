export interface Project {
  id: string;
  year: number;
  category: string;
  title: string;
  summary: string;     // 리스트에서 보여줄 짧은 글
  description: string; // 상세 보기 시 보여줄 긴 글
  github_url: string;
  demo_url: string;
  thumbnail: string;
  members: string;     // "김철수, 이영희" 형태의 문자열
}

// id title thumbnail members year category github_url demo_url summary description