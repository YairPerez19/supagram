# Supagram

Repositorio del frontend para el **Curso de Supabase**. Una aplicación inspirada en Instagram construida con [Next.js](https://nextjs.org) y [Supabase](https://supabase.com) como backend.

## Tecnologías

- **Frontend:** Next.js
- **Backend:** Supabase (autenticación, base de datos, storage)

## Comenzar

Instala las dependencias e inicia el servidor de desarrollo:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Configurar Supabase

1. Crea un proyecto en Supabase y copia la URL del proyecto y su publishable key.
2. Crea `.env.local` a partir de `env.example` y agrega esos valores:

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   ```

3. Ejecuta `supabase/migrations/20261007000000_initial_schema.sql` desde el SQL Editor del proyecto, o enlaza Supabase CLI con `npx supabase link` y ejecuta `npx supabase db push`.
4. En Authentication → URL Configuration, establece la URL de producción de Vercel y agrega también `http://localhost:3000/**` como URL de redirección.

La migración crea perfiles vinculados a Auth, publicaciones, políticas de acceso y el bucket público `supagram`. Las subidas requieren una sesión iniciada.

## Desplegar en Vercel

Importa `YairPerez19/supagram` desde GitHub en Vercel. Agrega `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` a las variables de entorno de Production, Preview y Development, y despliega la rama `main`.

## Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Supabase](https://supabase.com/docs)
