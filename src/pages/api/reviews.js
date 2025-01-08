import { createClient } from "contentful";
import dotenv from "dotenv";

dotenv.config();

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function GET() {
  try {
    const response = await client.getEntries({
      content_type: "tintaRazon",
    });

    const reviews = response.items.map((item) => ({
      Idpost: item.sys?.id || "Sin ID",
      Titulo: item.fields?.titulo || "Sin título",
      Autor: item.fields?.autor || "Autor desconocido",
      Opinion: item.fields?.opinion || "Sin opinión disponible",
      Portada: item.fields?.portada?.fields?.file?.url
        ? `https:${item.fields.portada.fields.file.url}`
        : null,
      Fecha: item.fields?.fecha || "Fecha no especificada",
      Valor: item.fields?.valor || 0,
  Genero: item.fields?.genero || "Sin género especificado",
    }));

    return new Response(JSON.stringify(reviews), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error al cargar las reseñas:", error);
    return new Response(
      JSON.stringify({ message: "Error al cargar las reseñas." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
