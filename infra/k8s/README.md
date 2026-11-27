# 로컬 Kubernetes 배포 (Docker Desktop)

## 0. 준비
- Docker Desktop → Settings → Kubernetes → Enable Kubernetes
- `kubectl get nodes` 에서 노드가 `Ready` 인지 확인
- 이미지 빌드 (저장소 루트에서)
  ```bash
  docker build -t dealflow-backend:local ./backend
  docker build -t dealflow-frontend:local ./frontend
  ```
- compose로 띄운 앱이 있다면 내려두기 (포트 충돌 방지)
  ```bash
  docker compose -f infra/docker/docker-compose.yml --profile app down
  ```

## 1. 네임스페이스 + Secret
```bash
kubectl apply -f infra/k8s/00-namespace.yaml
cp infra/k8s/secret.example.yaml infra/k8s/secret.yaml   # 값 수정
kubectl apply -f infra/k8s/secret.yaml
```

## 2. DB
```bash
kubectl apply -f infra/k8s/10-db.yaml
kubectl get pods -n dealflow -w      # db-0 이 1/1 Running 이면 다음 (Ctrl+C로 빠져나오기)
```

## 3. 백엔드
```bash
kubectl apply -f infra/k8s/20-backend.yaml
kubectl get pods -n dealflow -w      # backend-xxx 가 1/1 Running
```

## 4. 프론트
```bash
kubectl apply -f infra/k8s/30-frontend.yaml
kubectl get pods -n dealflow
```

## 5. 접속 확인
```bash
kubectl port-forward -n dealflow svc/frontend 3000:80
```
브라우저에서 http://localhost:3000 → "서버 상태: ok"

## 상태 확인 / 디버깅
```bash
kubectl get all -n dealflow
kubectl describe pod <파드이름> -n dealflow   # 이벤트 (이미지, 프로브 실패 등)
kubectl logs <파드이름> -n dealflow           # 애플리케이션 로그
```

## 코드를 바꾼 뒤 다시 배포
```bash
docker build -t dealflow-backend:local ./backend
kubectl rollout restart deployment/backend -n dealflow
```

## 전부 지우기
```bash
kubectl delete namespace dealflow   # PVC(DB 데이터)까지 함께 삭제됨
```
