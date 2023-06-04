FROM node:18

EXPOSE 3000
RUN npm i -g pnpm

COPY ./backend /backend
COPY ./frontend /frontend

WORKDIR /frontend
RUN pnpm i
RUN npm run build

WORKDIR /backend
RUN pnpm i
CMD ["npm","start"]