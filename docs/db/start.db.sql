CREATE TABLE public."Usuario" (
  "Id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  "DataCriacao" timestamp with time zone NOT NULL DEFAULT now(),
  "Nome" character varying,
  "Biografia" character varying,
  "UserName" character varying NOT NULL DEFAULT ''::character varying,
  "Email" character varying NOT NULL DEFAULT ''::character varying,
  CONSTRAINT "Usuario_pkey" PRIMARY KEY ("Id")
);

CREATE TABLE public."Feedback" (
  "Id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  "DataCriacao" timestamp with time zone NOT NULL DEFAULT now(),
  "UsuarioId" bigint,
  "Descricao" character varying NOT NULL DEFAULT ''::character varying,
  CONSTRAINT "Feedback_pkey" PRIMARY KEY ("Id"),
  CONSTRAINT "Feedback_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES public."Usuario"("Id")
);

CREATE TABLE public."Links" (
  "Id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  "DataCriacao" timestamp with time zone NOT NULL DEFAULT now(),
  "UsuarioId" bigint,
  "Titulo" character varying NOT NULL DEFAULT ''::character varying,
  "URL" character varying NOT NULL DEFAULT ''::character varying,
  CONSTRAINT "Links_pkey" PRIMARY KEY ("Id"),
  CONSTRAINT "Links_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES public."Usuario"("Id")
);

