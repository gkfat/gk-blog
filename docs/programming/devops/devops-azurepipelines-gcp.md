---
layout: doc

title: DevOps 學習筆記 - AzurePipelines、Docker、GCP

description: 近期在公司內接觸到了部署測試站的流程，有別於以往直接通通 `scp` 過去 VM 的暴力方式，這裡採用的是` AzurePipelines`、`Docker`、`GCP` 之間的半自動化協作，看來正在往 CI/CD 的路上發展。藉此機會，將學到的一些東西整理起來。
---

# {{ $frontmatter.title }}

:::info Intro
{{ $frontmatter.description }}
:::

## 整合部署流程

由於前人並沒有留下很明確的文件，許多步驟都是靠看程式碼推敲出來的，這條路真的是不好走，不過終究是整理出來了。從開發到部署的流程如下：

### 開發與測試

- 從 Azure 專案倉庫 clone 程式碼到本地
- Check out feature branch 進行開發
- 開發完成後，將分支進度推上 origin
- 連線至 VM 的 Jenkins，使用分支建置
- 部署 Dev 完成

這裡使用的是 `Jenkins` 搭配 `Azure` 版控的組合，讓開發者可以隨選分支進行建置，`Jenkins` 會負責將程式碼抓下來，啟動服務。

### 部署測試站

1. 將 feature 分支合併進 dev，dev 開 PR 合併進 master
1. master 變更會觸發 Azure pipelines 依專案內 azure-pipelines.yml 執行下列動作：
   1. 打包 Docker Image
   2. 推送到 GCP containerRegistry
   3. 於 master 分支加上版號 tag
1. 手動更新 k8s 配置檔，要變更的服務指向新 image tag
1. 使用 gcloud kubectl delete & apply k8s 配置檔
1. 部署測試站完成

在部署測試站之前，需要先了解下列基礎知識：

- Docker
- Azure Pipelines
- GCP、gcloud、kubectl

## 相關操作整理

### Docker

```bash:line-numbers
// 列出所有 container
docker ps -a

// 列出所有 image
docker images

// 從 docker hub 上拉下 image
docker pull {image_name}

// 將 image 啟動為 container
docker run --name {container_name} -p {container_port}:{tcp_port}
```

### Azure pipelines

Azure Pipelines 上有明確的步驟教學，只要照著做就能夠產出一份 yml 檔了。

### GCP、gcloud、kubectl

```bash:line-numbers
// 安裝 gcloud SDK
https://cloud.google.com/sdk/docs/install

// gcloud 安裝 kubectl
gcloud components install kubectl

// 若要在本地執行, 需先驗證 gcloud, 或使用 GCP Cloud Shell
gcloud auth login

/**
 * 更新 k8s 配置檔並運行 service
 */
// 將配置檔拉到本地
git clone ${Azure_ops_repo}

// 呼叫 k8s 移除指定資料夾下的設定檔
// kubectl delete ([-f FILENAME] | [-k DIRECTORY] | TYPE [(NAME | -l label | --all)]) [options]
kubectl delete -k .

// 呼叫 k8s 套用指定資料夾下的配置檔並運行 service
// kubectl apply (-f FILENAME | -k DIRECTORY) [options]
kubectl apply -k .
```
