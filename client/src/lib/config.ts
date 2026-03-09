export interface LocalizedString {
  es: string;
  en: string;
}

export interface Subject {
  title: LocalizedString;
  desc: LocalizedString;
}

export interface TabContent {
  id: string;
  label: LocalizedString;
  sublabel: LocalizedString;
  duration: string;
  description: LocalizedString;
  subjects: Subject[];
}

export interface SiteData {
  hero: {
    es: {
      tag: string;
      titulo: string;
      subtítulo: string;
      boton: string;
    };
    en: {
      tag: string;
      titulo: string;
      subtítulo: string;
      boton: string;
    };
  };
  inventionem: {
    precios: {
      anual: string;
      mensual: string;
      externo: string;
    };
    contacto: {
      whatsapp: string;
      email: string;
    };
    tabs: {
      primary: TabContent;
      secondary: TabContent;
      highschool: TabContent;
    };
  };
}

export const SITE_DATA: SiteData = {
  hero: {
    es: {
      tag: "DIÁLOGO CON LA NATURALEZA",
      titulo: "El Volcán a tus Pies, las Estrellas a tu Alcance.",
      subtítulo: "Sin distracciones. Solo la arquitectura de la montaña y la pureza del entorno.",
      boton: "COMIENZA EL VIAJE"
    },
    en: {
      tag: "DIALOGUE WITH NATURE",
      titulo: "The Volcano at your Feet, the Stars within Reach.",
      subtítulo: "No distractions. Only the mountain’s architecture and the purity of the surroundings.",
      boton: "START THE JOURNEY"
    }
  },
  inventionem: {
    precios: {
      anual: "$24,995",
      mensual: "$2,850",
      externo: "$9,000"
    },
    contacto: {
      whatsapp: "523121500516",
      email: "info@inventionem.edu.mx"
    },
    tabs: {
      primary: {
        id: "primary",
        label: { es: "Primaria", en: "Elementary" },
        sublabel: { es: "Educación Básica", en: "Basic Education" },
        duration: "5–7 años",
        description: {
          es: "Formación integral basada en inteligencias múltiples, donde el bosque es el aula y la curiosidad es el motor del aprendizaje.",
          en: "Comprehensive training based on multiple intelligences, where the forest is the classroom and curiosity drives learning."
        },
        subjects: [
          { title: { es: "Inteligencias Múltiples", en: "Multiple Intelligences" }, desc: { es: "Desarrollo cognitivo personalizado.", en: "Personalized cognitive development." } },
          { title: { es: "Defensa Personal", en: "Self-Defense" }, desc: { es: "Disciplina y autoconfianza.", en: "Discipline and self-confidence." } },
          { title: { es: "Supervivencia Básica", en: "Basic Survival" }, desc: { es: "Orientación, fuego y refugio.", en: "Navigation, fire, and shelter." } },
          { title: { es: "Agroecología", en: "Agroecology" }, desc: { es: "Cultivo orgánico y compostaje.", en: "Organic farming and composting." } }
        ]
      },
      secondary: {
        id: "secondary",
        label: { es: "Secundaria", en: "Middle School" },
        sublabel: { es: "Educación Media", en: "Middle Education" },
        duration: "3 años",
        description: {
          es: "Profundización académica combinada con saberes ancestrales.",
          en: "Academic deepening combined with ancestral knowledge."
        },
        subjects: [
          { title: { es: "Ciencias Exactas", en: "Exact Sciences" }, desc: { es: "Matemáticas, Física y Química.", en: "Math, Physics, and Chemistry." } },
          { title: { es: "Plantas Medicinales", en: "Medicinal Plants" }, desc: { es: "Etnobotánica aplicada.", en: "Applied ethnobotany." } },
          { title: { es: "Economía", en: "Economics" }, desc: { es: "Emprendimiento social.", en: "Social entrepreneurship." } }
        ]
      },
      highschool: {
        id: "highschool",
        label: { es: "Bachillerato", en: "High School" },
        sublabel: { es: "Media Superior", en: "Upper Secondary" },
        duration: "3 años",
        description: {
          es: "Preparación avanzada para la formación de capital intelectual.",
          en: "Advanced preparation for intellectual capital formation."
        },
        subjects: [
          { title: { es: "Propiedad Intelectual", en: "Intellectual Property" }, desc: { es: "Registro de patentes y marcas.", en: "Patent and trademark registration." } },
          { title: { es: "Modelos de Utilidad", en: "Utility Models" }, desc: { es: "Diseño de invenciones.", en: "Invention design." } },
          { title: { es: "Simulación Numérica", en: "Numerical Simulation" }, desc: { es: "Modelado computacional.", en: "Computational modeling." } }
        ]
      }
    }
  }
};