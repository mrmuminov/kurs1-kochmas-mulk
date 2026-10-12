FROM python:3.12-slim
WORKDIR /app
RUN pip install flask
COPY app.py style.css ./
ENV HOST=0.0.0.0
ENV DATABASE_FILE=/data/database.sqlite
VOLUME /data
CMD ["python", "app.py"]
