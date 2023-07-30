cd ./node_http
# docker build -t node_http .
docker build -t arykinv/node_http .
docker tag arykinv/node_http arykinv/node_http:latest
docker push arykinv/node_http

cd ../node_mq_worker
# docker build -t node_mq_worker .
docker build -t arykinv/node_mq_worker .
docker tag arykinv/node_mq_worker arykinv/node_mq_worker:latest
docker push arykinv/node_mq_worker