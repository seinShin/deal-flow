import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState('확인 중...')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('연결 실패'))
  }, [])

  return <h1>deal-flow 서버 상태: {status}</h1>
}

export default App