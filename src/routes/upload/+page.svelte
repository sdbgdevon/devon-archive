<script lang="ts">
  import { PUBLIC_GAS_URL } from '$env/static/public';

  // --- 상태 관리 ---
  let isSubmitting = false;
  let isImageProcessing = false;
  let imagePreview: string | null = null;
  let base64File: string | null = null;
  let fileName: string = "";

  const MAX_SUMMARY = 100;
  
  let formData = {
    year: 2026,
    category: 'WEB',
    title: '',
    github_url: '',
    demo_url: '',
    summary: '',
    description: '',
    members: 'Dev-on' // 기본값 설정
  };

  $: summaryCount = formData.summary.length;
  $: descriptionCount = formData.description.length;

  // --- 1. 이미지 처리 (압축 및 Base64 변환) ---
  async function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      isImageProcessing = true;
      const file = target.files[0];
      fileName = file.name;

      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1000;
            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);

            base64File = canvas.toDataURL('image/jpeg', 0.7);
            imagePreview = base64File;
            isImageProcessing = false;
          };
        };
      } catch (err) {
        console.error(err);
        alert("이미지 처리 중 오류가 발생했습니다.");
        isImageProcessing = false;
      }
    }
  }

  // --- 2. 폼 제출 로직 ---
  async function handleSubmit() {
    if (isSubmitting || isImageProcessing) return;
    
    if (!base64File) {
      alert("프로젝트 썸네일 이미지를 선택해주세요!");
      return;
    }

    isSubmitting = true;

    try {
      const response = await fetch(PUBLIC_GAS_URL, {
        method: 'POST',
        mode: 'no-cors', // GAS 통신 필수 설정
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          ...formData,
          imageFile: base64File,
          imageName: fileName
        })
      });

      // no-cors 모드에서는 응답 내용을 읽을 수 없으므로 성공으로 간주하고 알림
      alert("✅ 프로젝트가 성공적으로 제출되었습니다!");
      
      // 폼 초기화
      formData = {
        year: 2026, category: 'WEB', title: '', github_url: '',
        demo_url: '', summary: '', description: '', members: 'Dev-on'
      };
      imagePreview = null;
      base64File = null;
    } catch (err) {
      console.error(err);
      alert("전송 중 오류가 발생했습니다.");
    } finally {
      isSubmitting = false;
    }
  }
</script>
  
  <div class="upload-container">
    <h1 class="page-title">ADD_NEW_PROJECT</h1>
  
    <form on:submit|preventDefault={handleSubmit} class="brutal-form">
  
      <div class="grid-2">
        <div class="input-group">
          <label for="year">YEAR</label>
          <input type="number" id="year" bind:value={formData.year} required />
        </div>
        <div class="input-group">
          <label for="category">CATEGORY</label>
          <select bind:value={formData.category}>
            <option value="WEB">WEB</option>
            <option value="APP">APP</option>
            <option value="AI">AI</option>
            <option value="GAME">GAME</option>
            <option value="ALGORITHM">ALGORITHM</option>
            <option value="PROGRAM">PROGRAM</option>
          </select>
        </div>
      </div>
  
      <div class="input-group">
        <label for="title">TITLE</label>
        <input type="text" id="title" bind:value={formData.title} required />
      </div>

      <div class="input-group">
        <label for="github">SOURCE_URL</label>
        <input type="text" id="github" bind:value={formData.github_url} required />
      </div>

      <div class="input-group">
        <label for="demo">DEMO_URL</label>
        <input type="text" id="demo" bind:value={formData.demo_url} required />
      </div>
  
      <div class="input-group">
        <div class="label-row">
          <label for="summary">SHORT_SUMMARY</label>
          <span class="char-count {summaryCount > MAX_SUMMARY ? 'limit' : ''}">
            {summaryCount}/{MAX_SUMMARY}
          </span>
        </div>
        <input 
          type="text" 
          id="summary" 
          bind:value={formData.summary} 
          maxlength="{MAX_SUMMARY}"
          placeholder="리스트에 노출될 짧은 글"
        />
      </div>
  
      <div class="input-group">
        <div class="label-row">
          <label for="description">DESCRIPTION</label>
          <span class="char-count {summaryCount > MAX_SUMMARY ? 'limit' : ''}">{descriptionCount} CHARS</span>
        </div>
        <textarea 
          id="description" 
          bind:value={formData.description}
          rows="5"
          placeholder="상세 페이지에 노출될 긴 글"
        ></textarea>
      </div>
  
      <div class="image-upload-wrapper">
        <label for="file-upload">PROJECT_THUMBNAIL</label>
        
        <input 
          type="file" id="file-upload" accept="image/*" 
          on:change={handleFileChange} style="display: none;" 
        />
        
        <button 
          type="button" class="upload-btn" 
          on:click={() => document.getElementById('file-upload')?.click()}
        >
          {isImageProcessing ? 'PROCESSING...' : 'SELECT_IMAGE'}
        </button>
      
        {#if imagePreview}
          <div class="preview-card">
            <img src={imagePreview} alt="Preview" />
            <button type="button" on:click={() => { imagePreview = null; base64File = null; }}>REMOVE</button>
          </div>
        {/if}
      </div>
      
  
      <button type="submit" class="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'UPLOADING...' : 'SUBMIT_DATA'}
      </button>
    </form>
  </div>
  
  <style>
    .upload-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 60px 20px;
    }
  
    .page-title {
      font-size: 3rem;
      font-weight: 500;
      margin-bottom: 40px;
      border-bottom: 8px solid #000;
      display: inline-block;
    }
  
    .brutal-form {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
  
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  
    label {
      font-weight: 500;
      font-size: 0.9rem;
      color: var(--point-orange);
    }
  
    input, textarea, select {
      border: 2px solid #000;
      padding: 15px;
      font-family: inherit;
      font-weight: 700;
      font-size: 1rem;
      outline: none;
      background: #fff;
      transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  
    input:focus, textarea:focus {
      border: 3px solid var(--point-orange);
    }
  
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
  
    .submit-btn {
      background: #000;
      color: #fff;
      padding: 20px;
      font-weight: 500;
      font-size: 1.5rem;
      cursor: pointer;
      border: none;
      transition: transform 0.1s;
    }
  
    .submit-btn:hover {
      background: var(--point-orange);
      transform: translate(-4px, -4px);
      box-shadow: 4px 4px 0px #000;
    }

    textarea {
        resize: vertical;
    }
  
    .submit-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .label-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 5px;
  }

  .char-count {
    font-size: 11px;
    font-weight: 900;
    color: #888;
  }

  /* 글자 수가 제한을 넘었을 때 브루탈리즘 레드 경고 */
  .char-count.limit {
    color: #fff;
    background: #ff0000;
    padding: 2px 4px;
  }

  .input-group label {
    margin-bottom: 0; /* label-row에서 간격을 조절하므로 제거 */
  }

  .image-upload-wrapper {
    border: 3px solid #000;
    padding: 20px;
    background: #f0f0f0;
    margin-bottom: 20px;
  }

  .upload-btn {
    width: 100%;
    padding: 15px;
    background: #000;
    color: #fff;
    font-weight: 900;
    cursor: pointer;
    border: none;
  }

  .preview-card {
    margin-top: 15px;
    border: 2px solid #000;
    padding: 5px;
    background: #fff;
  }

  .preview-card img {
    width: 100%;
    display: block;
    margin-bottom: 5px;
  }

  .preview-card button {
    width: 100%;
    background: #ff5500;
    color: #fff;
    border: none;
    padding: 5px;
    font-weight: 900;
    cursor: pointer;
  }
</style>