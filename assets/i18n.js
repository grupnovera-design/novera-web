/* ════════════════════════════════════════════════════════════
   NOVERA — i18n (CA · ES · EN)
   Motor de traducció per nodes de text: preserva el marcatge
   (em, strong, br, spans), persisteix l'idioma, llegeix ?lang=,
   ajusta <html lang> i injecta el selector d'idioma a la nav.
   Les cadenes no presents al diccionari es queden en català.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var LANGS = ["ca", "es", "en"];
  var STORE = "novera_lang";

  /* ── Diccionari · clau = català normalitzat ──────────────────── */
  var T = {
    es: {
      // Nav
      "El model": "El modelo", "L'equip": "El equipo", "Plans": "Planes",
      "Canal Compradors": "Canal Compradores", "Descobreix": "Descubre",
      "El procés": "El proceso", "Descobreix el teu camí": "Descubre tu camino",
      "Venedors": "Vendedores", "Crear perfil": "Crear perfil",
      "Crear el meu perfil de cerca": "Crear mi perfil de búsqueda",
      "Com funciona": "Cómo funciona",
      // Hero
      "PER QUÈ VENDRE UNA PROPIETAT HA DE SER TAN COMPLICAT?": "¿POR QUÉ VENDER UNA PROPIEDAD HA DE SER TAN COMPLICADO?",
      "Una nova manera": "Una nueva manera", "de vendre": "de vender", "casa teva": "tu casa",
      "Sense percentatges sobre la venda. Un preu just per la feina ben feta — i tu sempre amb el control.": "Sin porcentajes sobre la venta. Un precio justo por el trabajo bien hecho — y tú siempre con el control.",
      "Valora la teva propietat": "Valora tu propiedad",
      "Ets comprador? Entra al": "¿Eres comprador? Entra en el",
      "Canal de compradors": "Canal de compradores", "Descobreix el model": "Descubre el modelo",
      // Manifest
      "El mercat porta dècades amb les mateixes regles.": "El mercado lleva décadas con las mismas reglas.",
      "Processos lents, informació poc clara i uns costos que ningú entén del tot.": "Procesos lentos, información poco clara y unos costes que nadie entiende del todo.",
      "El propietari d'avui busca una altra cosa:": "El propietario de hoy busca otra cosa:",
      "transparència, control i tranquil·litat.": "transparencia, control y tranquilidad.",
      "NOVERA no ve a competir. Ve a canviar la manera de fer-ho.": "NOVERA no viene a competir. Viene a cambiar la manera de hacerlo.",
      // Comparativa
      "La comparativa": "La comparativa",
      "Els honoraris no haurien de dependre del valor de casa teva.": "Los honorarios no deberían depender del valor de tu casa.",
      "El model tradicional cobra un percentatge sobre el valor de casa teva. NOVERA cobra un preu fix per la feina feta. Mira la diferència.": "El modelo tradicional cobra un porcentaje sobre el valor de tu casa. NOVERA cobra un precio fijo por el trabajo hecho. Mira la diferencia.",
      "Model tradicional": "Modelo tradicional",
      "Percentatges sobre el valor de la propietat.": "Porcentajes sobre el valor de la propiedad.",
      "Diversos interlocutors durant el procés.": "Varios interlocutores durante el proceso.",
      "Costos que augmenten amb el preu de venda.": "Costes que aumentan con el precio de venta.",
      "Informació dispersa entre diferents professionals.": "Información dispersa entre diferentes profesionales.",
      "El propietari s'adapta al sistema.": "El propietario se adapta al sistema.",
      "Model NOVERA": "Modelo NOVERA",
      "Preu fix i transparent des del primer dia.": "Precio fijo y transparente desde el primer día.",
      "Un únic equip coordinant tot el procés.": "Un único equipo coordinando todo el proceso.",
      "Honoraris basats en la feina realitzada.": "Honorarios basados en el trabajo realizado.",
      "Seguiment clar de cada etapa.": "Seguimiento claro de cada etapa.",
      "El sistema s'adapta al propietari.": "El sistema se adapta al propietario.",
      "Un exemple real": "Un ejemplo real",
      "Venda d'un immoble de 200.000 €": "Venta de un inmueble de 200.000 €",
      "5% de comissió": "5% de comisión", "preu fix": "precio fijo",
      "Més d'un 50% d'estalvi": "Más de un 50% de ahorro", "Estalvi potencial": "Ahorro potencial",
      "No pagues més perquè la teva propietat val més. Paga per la feina feta.": "No pagas más porque tu propiedad valga más. Paga por el trabajo hecho.",
      // Equip
      "Una propietat.": "Una propiedad.", "Un equip complet.": "Un equipo completo.",
      "No creiem en la figura d'una sola persona intentant fer-ho tot. Cada operació activa els professionals que realment necessita, coordinats al voltant d'un únic objectiu: vendre bé la teva propietat.": "No creemos en la figura de una sola persona intentando hacerlo todo. Cada operación activa los profesionales que realmente necesita, coordinados en torno a un único objetivo: vender bien tu propiedad.",
      "Passa el cursor per cada especialitat": "Pasa el cursor por cada especialidad",
      "Ningú ho fa tot.": "Nadie lo hace todo.",
      "Per això hem construït una estructura on cada especialista treballa en allò que millor sap fer. Mentre tu tens un únic punt de contacte, darrere hi ha un equip complet coordinant cada fase del procés.": "Por eso hemos construido una estructura donde cada especialista trabaja en lo que mejor sabe hacer. Mientras tú tienes un único punto de contacto, detrás hay un equipo completo coordinando cada fase del proceso.",
      "Més control": "Más control",
      "Cada fase és gestionada per l'especialista adequat.": "Cada fase la gestiona el especialista adecuado.",
      "Menys errors": "Menos errores",
      "La documentació, els aspectes legals i els processos tècnics estan coordinats.": "La documentación, los aspectos legales y los procesos técnicos están coordinados.",
      "Més valor": "Más valor",
      "Cada decisió busca maximitzar el resultat final de la venda.": "Cada decisión busca maximizar el resultado final de la venta.",
      "No contractes una immobiliària.": "No contratas una inmobiliaria.",
      "Actives una estructura completa al servei de la teva propietat.": "Activas una estructura completa al servicio de tu propiedad.",
      // Procés
      "Deu passos.": "Diez pasos.", "Tu, sempre acompanyat.": "Tú, siempre acompañado.",
      "Del primer contacte fins a la firma a notaria. Cada pas coordinat, sense que t'hagis de preocupar per res.": "Del primer contacto hasta la firma en notaría. Cada paso coordinado, sin que tengas que preocuparte por nada.",
      "passos coordinats": "pasos coordinados", "per un sol equip": "por un solo equipo",
      "Contacte": "Contacto", "Ens escrius i et responem en menys de 24 hores.": "Nos escribes y te respondemos en menos de 24 horas.",
      "Conversa": "Conversación", "Ens expliques l'immoble i la teva situació, sense compromís.": "Nos explicas el inmueble y tu situación, sin compromiso.",
      "Visita i valoració": "Visita y valoración", "Visitem, valorem i t'expliquem el preu amb honestedat.": "Visitamos, valoramos y te explicamos el precio con honestidad.",
      "Estudi legal": "Estudio legal", "L'advocat ho revisa tot. Sense sorpreses més endavant.": "El abogado lo revisa todo. Sin sorpresas más adelante.",
      "Encàrrec": "Encargo", "Un document simple i un preu fix. Comencem a treballar.": "Un documento simple y un precio fijo. Empezamos a trabajar.",
      "Preparació": "Preparación", "Fotografia, vídeo i posada a punt de l'immoble.": "Fotografía, vídeo y puesta a punto del inmueble.",
      "Publicació": "Publicación", "Portals, xarxes i la nostra base de compradors.": "Portales, redes y nuestra base de compradores.",
      "Oferta": "Oferta", "Negociem en nom teu i tu decideixes si l'acceptes.": "Negociamos en tu nombre y tú decides si la aceptas.",
      "Arres": "Arras", "L'advocat redacta i gestiona tota la documentació.": "El abogado redacta y gestiona toda la documentación.",
      "Notaria": "Notaría", "Coordinació completa fins a la firma. Fet.": "Coordinación completa hasta la firma. Hecho.",
      // Descobreix
      "Anàlisi personalitzada": "Análisis personalizado",
      "Descobreix quin és el millor camí per vendre la teva propietat.": "Descubre cuál es el mejor camino para vender tu propiedad.",
      "En menys de 2 minuts analitzem la teva situació i et recomanem el model NOVERA més adequat.": "En menos de 2 minutos analizamos tu situación y te recomendamos el modelo NOVERA más adecuado.",
      // Plans
      "Tria fins on vols arribar.": "Elige hasta dónde quieres llegar.",
      "Tots els plans inclouen valoració, estudi legal, fotografia professional i acompanyament durant tot el procés. Cap percentatge sobre la venda.": "Todos los planes incluyen valoración, estudio legal, fotografía profesional y acompañamiento durante todo el proceso. Ningún porcentaje sobre la venta.",
      "fins a 3.490 €": "hasta 3.490 €", "fins a 5.990 €": "hasta 5.990 €", "fins a 9.990 €": "hasta 9.990 €",
      "Vendre amb suport professional i seguretat legal des del primer moment.": "Vender con respaldo profesional y seguridad legal desde el primer momento.",
      "Valoració professional": "Valoración profesional",
      "Fotografia i publicació a portals": "Fotografía y publicación en portales",
      "Documentació i contracte d'arres": "Documentación y contrato de arras",
      "Acompanyament durant tot el procés": "Acompañamiento durante todo el proceso",
      "Gestió de visites": "Gestión de visitas", "Negociació i notaria": "Negociación y notaría",
      "Recomanat": "Recomendado",
      "Tu només decideixes si acceptes l'oferta. De la resta, ens n'ocupem nosaltres.": "Tú solo decides si aceptas la oferta. Del resto, nos ocupamos nosotros.",
      "Tot el que inclou Basic": "Todo lo que incluye Basic",
      "Gestió completa de visites": "Gestión completa de visitas",
      "Negociació i estudi de solvència": "Negociación y estudio de solvencia",
      "Estratègia de posicionament de preu": "Estrategia de posicionamiento de precio",
      "Coordinació amb gestoria i notaria": "Coordinación con gestoría y notaría",
      "Acompanyament fins a la firma": "Acompañamiento hasta la firma",
      "Ens ocupem absolutament de tot perquè venguis amb la màxima tranquil·litat.": "Nos ocupamos absolutamente de todo para que vendas con la máxima tranquilidad.",
      "Tot el que inclou Pro": "Todo lo que incluye Pro",
      "Reportatge premium: foto, vídeo i tour": "Reportaje premium: foto, vídeo y tour",
      "Estratègia de sortida personalitzada": "Estrategia de salida personalizada",
      "Gestió de certificats i tràmits": "Gestión de certificados y trámites",
      "Assessorament fiscal previ a la venda": "Asesoramiento fiscal previo a la venta",
      "Seguiment fins a la postfirma": "Seguimiento hasta la postfirma",
      "Veure si encaixa": "Ver si encaja",
      "Cap percentatge sobre la venda.": "Ningún porcentaje sobre la venta.",
      "Pagues per la feina, no pel preu de casa teva.": "Pagas por el trabajo, no por el precio de tu casa.",
      "Preus orientatius. La valoració concreta es fa sobre cada immoble.": "Precios orientativos. La valoración concreta se hace sobre cada inmueble.",
      // FAQ
      "Preguntes freqüents": "Preguntas frecuentes",
      "Tot el que vols": "Todo lo que quieres", "saber abans de vendre.": "saber antes de vender.",
      "Resolem els dubtes més habituals sobre honoraris, comissions i com funciona vendre amb NOVERA a la Costa Brava.": "Resolvemos las dudas más habituales sobre honorarios, comisiones y cómo funciona vender con NOVERA en la Costa Brava.",
      "Tens un altre dubte? Parlem-ne": "¿Tienes otra duda? Hablemos",
      "Quant costa vendre un habitatge amb NOVERA?": "¿Cuánto cuesta vender una vivienda con NOVERA?",
      "NOVERA cobra comissió sobre el preu de venda?": "¿NOVERA cobra comisión sobre el precio de venta?",
      "A quines zones de la Costa Brava opera NOVERA?": "¿En qué zonas de la Costa Brava opera NOVERA?",
      "Com puc saber quant val casa meva?": "¿Cómo puedo saber cuánto vale mi casa?",
      "Quina diferència hi ha amb una immobiliària tradicional?": "¿Qué diferencia hay con una inmobiliaria tradicional?",
      "A NOVERA treballem amb un": "En NOVERA trabajamos con un",
      "preu fix i transparent": "precio fijo y transparente",
      "des del primer dia, en funció del servei que tries. No apliquem cap percentatge sobre el preu de venda: els teus honoraris immobiliaris no pugen encara que la teva propietat valgui més.": "desde el primer día, según el servicio que elijas. No aplicamos ningún porcentaje sobre el precio de venta: tus honorarios inmobiliarios no suben aunque tu propiedad valga más.",
      "No. A diferència de les comissions immobiliàries tradicionals (que solen oscil·lar entre el 3% i el 5% del preu), els nostres honoraris són": "No. A diferencia de las comisiones inmobiliarias tradicionales (que suelen oscilar entre el 3% y el 5% del precio), nuestros honorarios son",
      "fixos i pactats per endavant": "fijos y pactados de antemano",
      ". Saps exactament què pagaràs abans de començar.": ". Sabes exactamente qué pagarás antes de empezar.",
      "Estem començant. Som una empresa jove que està provant i perfeccionant el procés per fer-lo tan òptim com sigui possible. Comencem per": "Estamos empezando. Somos una empresa joven que está probando y perfeccionando el proceso para hacerlo lo más óptimo posible. Empezamos por",
      ", el nostre punt de partida, i anirem ampliant zona a zona per tota la Costa Brava —Blanes, Tossa de Mar, Platja d'Aro, Begur i més— a mesura que ho puguem abastar amb la màxima qualitat i control.": ", nuestro punto de partida, y iremos ampliando zona a zona por toda la Costa Brava —Blanes, Tossa de Mar, Platja d'Aro, Begur y más— a medida que podamos abarcarlo con la máxima calidad y control.",
      "Et fem una": "Te hacemos una",
      "valoració gratuïta i sense compromís": "valoración gratuita y sin compromiso",
      ". Analitzem la teva propietat, la zona i el mercat actual, i t'expliquem amb honestedat a quin preu es pot vendre i en quant de temps.": ". Analizamos tu propiedad, la zona y el mercado actual, y te explicamos con honestidad a qué precio se puede vender y en cuánto tiempo.",
      "Un sol equip coordina tot el procés —valoració, estudi legal, fotografia, visites i notaria— amb un": "Un solo equipo coordina todo el proceso —valoración, estudio legal, fotografía, visitas y notaría— con un",
      "únic punt de contacte": "único punto de contacto",
      "i honoraris basats en la feina, no en el preu de venda. És una alternativa real a les immobiliàries tradicionals.": "y honorarios basados en el trabajo, no en el precio de venta. Es una alternativa real a las inmobiliarias tradicionales.",
      // Parlem
      "Parlem": "Hablemos",
      "Comença per una conversa. Sense compromís.": "Empieza por una conversación. Sin compromiso.",
      "Et fem la valoració, t'expliquem com funcionaria per a la teva propietat en concret, i tu decideixes amb calma.": "Te hacemos la valoración, te explicamos cómo funcionaría para tu propiedad en concreto, y tú decides con calma.",
      "Escriu-nos": "Escríbenos",
      "Proposta personalitzada": "Propuesta personalizada",
      "Hem rebut les teves dades. Et contactarem en menys de 24 h per parlar de la teva proposta personalitzada.": "Hemos recibido tus datos. Te contactaremos en menos de 24 h para hablar de tu propuesta personalizada.",
      "Parlem per WhatsApp": "Hablemos por WhatsApp",
      "Tornar a començar": "Volver a empezar",
      "En NOVERA creiem que vendre bé comença per entendre bé.": "En NOVERA creemos que vender bien empieza por entender bien.",
      // Footer
      "La nova manera de vendre propietats.": "La nueva manera de vender propiedades.",
      "© 2026 NOVERA · Tot va començar a Lloret.": "© 2026 NOVERA · Todo empezó en Lloret.",
      "Avís legal": "Aviso legal", "Política de privacitat": "Política de privacidad",
      "Política de cookies": "Política de cookies", "Configurar cookies": "Configurar cookies",
      "Canal ètic": "Canal ético", "Baixa del Canal Compradors": "Baja del Canal Compradores",
      // Cookies
      "Respectem la teva privacitat": "Respetamos tu privacidad",
      "Fem servir cookies tècniques necessàries i, amb el teu permís, cookies analítiques i de màrqueting. Pots acceptar-les, rebutjar-les o configurar-les. Més informació a la": "Usamos cookies técnicas necesarias y, con tu permiso, cookies analíticas y de marketing. Puedes aceptarlas, rechazarlas o configurarlas. Más información en la",
      "Tècniques (necessàries)": "Técnicas (necesarias)",
      "Imprescindibles perquè el web funcioni. Sempre actives.": "Imprescindibles para que la web funcione. Siempre activas.",
      "Analítiques": "Analíticas",
      "Ens ajuden a entendre l'ús del web de manera agregada i anònima.": "Nos ayudan a entender el uso de la web de forma agregada y anónima.",
      "Màrqueting": "Marketing",
      "Permeten mostrar comunicacions rellevants sobre el sistema NOVERA.": "Permiten mostrar comunicaciones relevantes sobre el sistema NOVERA.",
      "Desar preferències": "Guardar preferencias", "Acceptar-ho tot": "Aceptar todo",
      "Rebutjar": "Rechazar", "Configurar": "Configurar",
      // Canal Compradors
      "CANAL COMPRADORS · SISTEMA NOVERA": "CANAL COMPRADORES · SISTEMA NOVERA",
      "Les millors propietats,": "Las mejores propiedades,", "abans que ningú.": "antes que nadie.",
      "Rep abans que ningú les propietats que encaixen amb tu. Sense portals. Sense soroll. Només oportunitats reals.": "Recibe antes que nadie las propiedades que encajan contigo. Sin portales. Sin ruido. Solo oportunidades reales.",
      "Crear el meu perfil de cerca": "Crear mi perfil de búsqueda",
      "La teva subpàgina de perfil dins del sistema NOVERA. Com més precís és el teu perfil, més eficient és el sistema.": "Tu subpágina de perfil dentro del sistema NOVERA. Cuanto más preciso es tu perfil, más eficiente es el sistema.",
      "ara mateix": "ahora mismo",
      "Vil·la amb vistes al mar · Fenals": "Villa con vistas al mar · Fenals",
      "4 hab · 320 m² · piscina · primera línia": "4 hab · 320 m² · piscina · primera línea",
      "Veure-la": "Verla",
      "El mercat no es busca.": "El mercado no se busca.", "S'anticipa.": "Se anticipa.",
      "NOVERA analitza propietats actives i futures entrades al mercat. Quan detecta coincidències amb el teu perfil, t'avisa abans que arribin als portals públics.": "NOVERA analiza propiedades activas y futuras entradas al mercado. Cuando detecta coincidencias con tu perfil, te avisa antes de que lleguen a los portales públicos.",
      "Defineixes el teu perfil": "Defines tu perfil",
      "Zones, pressupost, tipus d'immoble i prioritats. En menys d'un minut.": "Zonas, presupuesto, tipo de inmueble y prioridades. En menos de un minuto.",
      "El sistema vigila el mercat": "El sistema vigila el mercado",
      "Propietats actives i futures entrades, monitoritzades de manera contínua.": "Propiedades activas y futuras entradas, monitorizadas de manera continua.",
      "Reps l'alerta abans que ningú": "Recibes la alerta antes que nadie",
      "Quan apareix una coincidència real, ets el primer a saber-ho.": "Cuando aparece una coincidencia real, eres el primero en saberlo.",
      "El teu perfil treballa": "Tu perfil trabaja", "mentre tu fas la teva vida.": "mientras tú haces tu vida.",
      "Tu no busques pisos cada dia: el sistema ho fa per tu i només t'avisa quan val la pena.": "Tú no buscas pisos cada día: el sistema lo hace por ti y solo te avisa cuando vale la pena.",
      "El teu perfil": "Tu perfil", "Crea el teu perfil de cerca": "Crea tu perfil de búsqueda",
      "Menys d'un minut. Com més ens expliques, més precises són les teves alertes.": "Menos de un minuto. Cuanto más nos cuentas, más precisas son tus alertas.",
      "Jurídic": "Jurídico",
      "Contractes, revisions i protecció legal.": "Contratos, revisiones y protección legal.",
      "Documentació": "Documentación",
      "Certificats, tràmits i coordinació administrativa.": "Certificados, trámites y coordinación administrativa.",
      "Àrea Tècnica": "Área Técnica",
      "Arquitectes tècnics, informes i certificacions.": "Arquitectos técnicos, informes y certificaciones.",
      "Presentació": "Presentación",
      "Fotografia i vídeo professional.": "Fotografía y vídeo profesional.",
      "Col·laboradors": "Colaboradores",
      "Professionals externs quan una actuació aporta valor.": "Profesionales externos cuando una actuación aporta valor.",
      "Estratègia de Mercat": "Estrategia de Mercado",
      "Coneixement local, posicionament i estratègia comercial.": "Conocimiento local, posicionamiento y estrategia comercial.",
      "Nucli de coordinació": "Núcleo de coordinación",
      "Ets venedor? Torna a la": "¿Eres vendedor? Vuelve a la",
      "pàgina principal": "página principal"
    },
    en: {
      "El model": "The model", "L'equip": "The team", "Plans": "Plans",
      "Canal Compradors": "Buyers Channel", "Descobreix": "Discover",
      "El procés": "The process", "Descobreix el teu camí": "Discover your path",
      "Venedors": "Sellers", "Crear perfil": "Create profile",
      "Crear el meu perfil de cerca": "Create my search profile",
      "Com funciona": "How it works",
      "PER QUÈ VENDRE UNA PROPIETAT HA DE SER TAN COMPLICAT?": "WHY SHOULD SELLING A PROPERTY BE SO COMPLICATED?",
      "Una nova manera": "A new way", "de vendre": "to sell", "casa teva": "your home",
      "Sense percentatges sobre la venda. Un preu just per la feina ben feta — i tu sempre amb el control.": "No percentages on the sale. A fair price for work well done — and you always in control.",
      "Valora la teva propietat": "Value your property",
      "Ets comprador? Entra al": "Are you a buyer? Enter the",
      "Canal de compradors": "Buyers Channel", "Descobreix el model": "Discover the model",
      "El mercat porta dècades amb les mateixes regles.": "The market has had the same rules for decades.",
      "Processos lents, informació poc clara i uns costos que ningú entén del tot.": "Slow processes, unclear information and costs no one fully understands.",
      "El propietari d'avui busca una altra cosa:": "Today's owner wants something different:",
      "transparència, control i tranquil·litat.": "transparency, control and peace of mind.",
      "NOVERA no ve a competir. Ve a canviar la manera de fer-ho.": "NOVERA isn't here to compete. It's here to change how it's done.",
      "La comparativa": "The comparison",
      "Els honoraris no haurien de dependre del valor de casa teva.": "Fees shouldn't depend on the value of your home.",
      "El model tradicional cobra un percentatge sobre el valor de casa teva. NOVERA cobra un preu fix per la feina feta. Mira la diferència.": "The traditional model charges a percentage of your home's value. NOVERA charges a fixed price for the work done. See the difference.",
      "Model tradicional": "Traditional model",
      "Percentatges sobre el valor de la propietat.": "Percentages on the property's value.",
      "Diversos interlocutors durant el procés.": "Several contacts throughout the process.",
      "Costos que augmenten amb el preu de venda.": "Costs that rise with the sale price.",
      "Informació dispersa entre diferents professionals.": "Information scattered across different professionals.",
      "El propietari s'adapta al sistema.": "The owner adapts to the system.",
      "Model NOVERA": "The NOVERA model",
      "Preu fix i transparent des del primer dia.": "A fixed, transparent price from day one.",
      "Un únic equip coordinant tot el procés.": "A single team coordinating the whole process.",
      "Honoraris basats en la feina realitzada.": "Fees based on the work done.",
      "Seguiment clar de cada etapa.": "Clear tracking of every stage.",
      "El sistema s'adapta al propietari.": "The system adapts to the owner.",
      "Un exemple real": "A real example",
      "Venda d'un immoble de 200.000 €": "Sale of a €200,000 property",
      "5% de comissió": "5% commission", "preu fix": "fixed price",
      "Més d'un 50% d'estalvi": "Over 50% savings", "Estalvi potencial": "Potential savings",
      "No pagues més perquè la teva propietat val més. Paga per la feina feta.": "You don't pay more because your property is worth more. You pay for the work done.",
      "Una propietat.": "One property.", "Un equip complet.": "One complete team.",
      "No creiem en la figura d'una sola persona intentant fer-ho tot. Cada operació activa els professionals que realment necessita, coordinats al voltant d'un únic objectiu: vendre bé la teva propietat.": "We don't believe in one person trying to do everything. Each sale activates the professionals it really needs, coordinated around a single goal: selling your property well.",
      "Passa el cursor per cada especialitat": "Hover over each specialty",
      "Ningú ho fa tot.": "No one does it all.",
      "Per això hem construït una estructura on cada especialista treballa en allò que millor sap fer. Mentre tu tens un únic punt de contacte, darrere hi ha un equip complet coordinant cada fase del procés.": "That's why we've built a structure where each specialist works on what they do best. While you have a single point of contact, behind it a complete team coordinates every phase.",
      "Més control": "More control",
      "Cada fase és gestionada per l'especialista adequat.": "Each phase is handled by the right specialist.",
      "Menys errors": "Fewer errors",
      "La documentació, els aspectes legals i els processos tècnics estan coordinats.": "Documentation, legal matters and technical processes are coordinated.",
      "Més valor": "More value",
      "Cada decisió busca maximitzar el resultat final de la venda.": "Every decision aims to maximize the final result of the sale.",
      "No contractes una immobiliària.": "You're not hiring an agency.",
      "Actives una estructura completa al servei de la teva propietat.": "You activate a complete structure at the service of your property.",
      "Deu passos.": "Ten steps.", "Tu, sempre acompanyat.": "You, always accompanied.",
      "Del primer contacte fins a la firma a notaria. Cada pas coordinat, sense que t'hagis de preocupar per res.": "From first contact to signing at the notary. Every step coordinated, with nothing for you to worry about.",
      "passos coordinats": "coordinated steps", "per un sol equip": "by a single team",
      "Contacte": "Contact", "Ens escrius i et responem en menys de 24 hores.": "You write to us and we reply in under 24 hours.",
      "Conversa": "Conversation", "Ens expliques l'immoble i la teva situació, sense compromís.": "You tell us about the property and your situation, with no obligation.",
      "Visita i valoració": "Visit and valuation", "Visitem, valorem i t'expliquem el preu amb honestedat.": "We visit, value and explain the price honestly.",
      "Estudi legal": "Legal review", "L'advocat ho revisa tot. Sense sorpreses més endavant.": "The lawyer reviews everything. No surprises later.",
      "Encàrrec": "Engagement", "Un document simple i un preu fix. Comencem a treballar.": "A simple document and a fixed price. We get to work.",
      "Preparació": "Preparation", "Fotografia, vídeo i posada a punt de l'immoble.": "Photography, video and getting the property ready.",
      "Publicació": "Publishing", "Portals, xarxes i la nostra base de compradors.": "Portals, social media and our buyer database.",
      "Oferta": "Offer", "Negociem en nom teu i tu decideixes si l'acceptes.": "We negotiate on your behalf and you decide whether to accept.",
      "Arres": "Deposit contract", "L'advocat redacta i gestiona tota la documentació.": "The lawyer drafts and manages all the paperwork.",
      "Notaria": "Notary", "Coordinació completa fins a la firma. Fet.": "Full coordination through to signing. Done.",
      "Anàlisi personalitzada": "Personalized analysis",
      "Descobreix quin és el millor camí per vendre la teva propietat.": "Discover the best path to sell your property.",
      "En menys de 2 minuts analitzem la teva situació i et recomanem el model NOVERA més adequat.": "In under 2 minutes we analyze your situation and recommend the most suitable NOVERA model.",
      "Tria fins on vols arribar.": "Choose how far you want to go.",
      "Tots els plans inclouen valoració, estudi legal, fotografia professional i acompanyament durant tot el procés. Cap percentatge sobre la venda.": "All plans include valuation, legal review, professional photography and support throughout. No percentage on the sale.",
      "fins a 3.490 €": "up to €3,490", "fins a 5.990 €": "up to €5,990", "fins a 9.990 €": "up to €9,990",
      "Vendre amb suport professional i seguretat legal des del primer moment.": "Sell with professional backing and legal security from the start.",
      "Valoració professional": "Professional valuation",
      "Fotografia i publicació a portals": "Photography and portal listing",
      "Documentació i contracte d'arres": "Paperwork and deposit contract",
      "Acompanyament durant tot el procés": "Support throughout the process",
      "Gestió de visites": "Viewings management", "Negociació i notaria": "Negotiation and notary",
      "Recomanat": "Recommended",
      "Tu només decideixes si acceptes l'oferta. De la resta, ens n'ocupem nosaltres.": "You only decide whether to accept the offer. We handle the rest.",
      "Tot el que inclou Basic": "Everything in Basic",
      "Gestió completa de visites": "Full viewings management",
      "Negociació i estudi de solvència": "Negotiation and solvency check",
      "Estratègia de posicionament de preu": "Price positioning strategy",
      "Coordinació amb gestoria i notaria": "Coordination with admin office and notary",
      "Acompanyament fins a la firma": "Support through to signing",
      "Ens ocupem absolutament de tot perquè venguis amb la màxima tranquil·litat.": "We take care of absolutely everything so you sell with total peace of mind.",
      "Tot el que inclou Pro": "Everything in Pro",
      "Reportatge premium: foto, vídeo i tour": "Premium media: photo, video and tour",
      "Estratègia de sortida personalitzada": "Custom go-to-market strategy",
      "Gestió de certificats i tràmits": "Certificates and paperwork handling",
      "Assessorament fiscal previ a la venda": "Pre-sale tax advice",
      "Seguiment fins a la postfirma": "Support through to post-signing",
      "Veure si encaixa": "See if it fits",
      "Cap percentatge sobre la venda.": "No percentage on the sale.",
      "Pagues per la feina, no pel preu de casa teva.": "You pay for the work, not for the price of your home.",
      "Preus orientatius. La valoració concreta es fa sobre cada immoble.": "Indicative prices. The exact valuation is made per property.",
      "Preguntes freqüents": "Frequently asked questions",
      "Tot el que vols": "Everything you want", "saber abans de vendre.": "to know before selling.",
      "Resolem els dubtes més habituals sobre honoraris, comissions i com funciona vendre amb NOVERA a la Costa Brava.": "We answer the most common questions about fees, commissions and how selling with NOVERA on the Costa Brava works.",
      "Tens un altre dubte? Parlem-ne": "Got another question? Let's talk",
      "Quant costa vendre un habitatge amb NOVERA?": "How much does it cost to sell a home with NOVERA?",
      "NOVERA cobra comissió sobre el preu de venda?": "Does NOVERA charge commission on the sale price?",
      "A quines zones de la Costa Brava opera NOVERA?": "Which Costa Brava areas does NOVERA cover?",
      "Com puc saber quant val casa meva?": "How can I find out what my home is worth?",
      "Quina diferència hi ha amb una immobiliària tradicional?": "How is it different from a traditional agency?",
      "A NOVERA treballem amb un": "At NOVERA we work with a",
      "preu fix i transparent": "fixed, transparent price",
      "des del primer dia, en funció del servei que tries. No apliquem cap percentatge sobre el preu de venda: els teus honoraris immobiliaris no pugen encara que la teva propietat valgui més.": "from day one, depending on the service you choose. We don't apply any percentage on the sale price: your fees don't go up even if your property is worth more.",
      "No. A diferència de les comissions immobiliàries tradicionals (que solen oscil·lar entre el 3% i el 5% del preu), els nostres honoraris són": "No. Unlike traditional agency commissions (typically 3%–5% of the price), our fees are",
      "fixos i pactats per endavant": "fixed and agreed in advance",
      ". Saps exactament què pagaràs abans de començar.": ". You know exactly what you'll pay before starting.",
      "Estem començant. Som una empresa jove que està provant i perfeccionant el procés per fer-lo tan òptim com sigui possible. Comencem per": "We're just getting started. We're a young company testing and refining our process to make it as good as it can be. We begin in",
      ", el nostre punt de partida, i anirem ampliant zona a zona per tota la Costa Brava —Blanes, Tossa de Mar, Platja d'Aro, Begur i més— a mesura que ho puguem abastar amb la màxima qualitat i control.": ", our starting point, and we'll expand area by area across the Costa Brava —Blanes, Tossa de Mar, Platja d'Aro, Begur and more— as we can cover it with the highest quality and control.",
      "Et fem una": "We give you a",
      "valoració gratuïta i sense compromís": "free, no-obligation valuation",
      ". Analitzem la teva propietat, la zona i el mercat actual, i t'expliquem amb honestedat a quin preu es pot vendre i en quant de temps.": ". We analyze your property, the area and the current market, and tell you honestly what price it can sell for and how long it may take.",
      "Un sol equip coordina tot el procés —valoració, estudi legal, fotografia, visites i notaria— amb un": "A single team coordinates the whole process —valuation, legal review, photography, viewings and notary— with a",
      "únic punt de contacte": "single point of contact",
      "i honoraris basats en la feina, no en el preu de venda. És una alternativa real a les immobiliàries tradicionals.": "and fees based on the work, not the sale price. A real alternative to traditional agencies.",
      "Parlem": "Let's talk",
      "Comença per una conversa. Sense compromís.": "Start with a conversation. No obligation.",
      "Et fem la valoració, t'expliquem com funcionaria per a la teva propietat en concret, i tu decideixes amb calma.": "We value your property, explain how it would work for your specific case, and you decide calmly.",
      "Escriu-nos": "Write to us",
      "Proposta personalitzada": "Personalized proposal",
      "Hem rebut les teves dades. Et contactarem en menys de 24 h per parlar de la teva proposta personalitzada.": "We've received your details. We'll contact you within 24 hours to discuss your personalized proposal.",
      "Parlem per WhatsApp": "Chat with us on WhatsApp",
      "Tornar a començar": "Start over",
      "En NOVERA creiem que vendre bé comença per entendre bé.": "At NOVERA we believe selling well starts with understanding well.",
      "La nova manera de vendre propietats.": "The new way to sell properties.",
      "© 2026 NOVERA · Tot va començar a Lloret.": "© 2026 NOVERA · It all began in Lloret.",
      "Avís legal": "Legal notice", "Política de privacitat": "Privacy policy",
      "Política de cookies": "Cookie policy", "Configurar cookies": "Cookie settings",
      "Canal ètic": "Ethics channel", "Baixa del Canal Compradors": "Unsubscribe from Buyers Channel",
      "Respectem la teva privacitat": "We respect your privacy",
      "Fem servir cookies tècniques necessàries i, amb el teu permís, cookies analítiques i de màrqueting. Pots acceptar-les, rebutjar-les o configurar-les. Més informació a la": "We use necessary technical cookies and, with your permission, analytics and marketing cookies. You can accept, reject or configure them. More info in the",
      "Tècniques (necessàries)": "Technical (necessary)",
      "Imprescindibles perquè el web funcioni. Sempre actives.": "Essential for the site to work. Always on.",
      "Analítiques": "Analytics",
      "Ens ajuden a entendre l'ús del web de manera agregada i anònima.": "They help us understand site usage in an aggregated, anonymous way.",
      "Màrqueting": "Marketing",
      "Permeten mostrar comunicacions rellevants sobre el sistema NOVERA.": "They allow relevant communications about the NOVERA system.",
      "Desar preferències": "Save preferences", "Acceptar-ho tot": "Accept all",
      "Rebutjar": "Reject", "Configurar": "Configure",
      "CANAL COMPRADORS · SISTEMA NOVERA": "BUYERS CHANNEL · NOVERA SYSTEM",
      "Les millors propietats,": "The best properties,", "abans que ningú.": "before anyone else.",
      "Rep abans que ningú les propietats que encaixen amb tu. Sense portals. Sense soroll. Només oportunitats reals.": "Get the properties that match you before anyone else. No portals. No noise. Only real opportunities.",
      "La teva subpàgina de perfil dins del sistema NOVERA. Com més precís és el teu perfil, més eficient és el sistema.": "Your profile subpage within the NOVERA system. The more precise your profile, the more efficient the system.",
      "ara mateix": "just now",
      "Vil·la amb vistes al mar · Fenals": "Sea-view villa · Fenals",
      "4 hab · 320 m² · piscina · primera línia": "4 bed · 320 m² · pool · seafront",
      "Veure-la": "View it",
      "El mercat no es busca.": "The market isn't searched.", "S'anticipa.": "It's anticipated.",
      "NOVERA analitza propietats actives i futures entrades al mercat. Quan detecta coincidències amb el teu perfil, t'avisa abans que arribin als portals públics.": "NOVERA analyzes active properties and future market entries. When it detects matches with your profile, it alerts you before they reach the public portals.",
      "Defineixes el teu perfil": "You define your profile",
      "Zones, pressupost, tipus d'immoble i prioritats. En menys d'un minut.": "Areas, budget, property type and priorities. In under a minute.",
      "El sistema vigila el mercat": "The system watches the market",
      "Propietats actives i futures entrades, monitoritzades de manera contínua.": "Active properties and future entries, continuously monitored.",
      "Reps l'alerta abans que ningú": "You get the alert before anyone",
      "Quan apareix una coincidència real, ets el primer a saber-ho.": "When a real match appears, you're the first to know.",
      "El teu perfil treballa": "Your profile works", "mentre tu fas la teva vida.": "while you get on with your life.",
      "Tu no busques pisos cada dia: el sistema ho fa per tu i només t'avisa quan val la pena.": "You don't search every day: the system does it for you and only alerts you when it's worth it.",
      "El teu perfil": "Your profile", "Crea el teu perfil de cerca": "Create your search profile",
      "Menys d'un minut. Com més ens expliques, més precises són les teves alertes.": "Under a minute. The more you tell us, the more precise your alerts.",
      "Jurídic": "Legal",
      "Contractes, revisions i protecció legal.": "Contracts, reviews and legal protection.",
      "Documentació": "Documentation",
      "Certificats, tràmits i coordinació administrativa.": "Certificates, paperwork and administrative coordination.",
      "Àrea Tècnica": "Technical Area",
      "Arquitectes tècnics, informes i certificacions.": "Technical architects, reports and certifications.",
      "Presentació": "Presentation",
      "Fotografia i vídeo professional.": "Professional photography and video.",
      "Col·laboradors": "Partners",
      "Professionals externs quan una actuació aporta valor.": "External professionals when an action adds value.",
      "Estratègia de Mercat": "Market Strategy",
      "Coneixement local, posicionament i estratègia comercial.": "Local knowledge, positioning and commercial strategy.",
      "Nucli de coordinació": "Coordination core",
      "Ets venedor? Torna a la": "Are you a seller? Back to the",
      "pàgina principal": "home page"
    }
  };

  /* ── Motor ────────────────────────────────────────────────────── */
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, SVG: 1, PATH: 1, "IMAGE-SLOT": 1, INPUT: 1, TEXTAREA: 1, CODE: 1, TITLE: 1 };
  var nodes = [];
  var current = "ca";

  function norm(s) { return s.replace(/\s+/g, " ").trim(); }

  function skipParent(node) {
    var p = node.parentElement;
    while (p) {
      if (SKIP[p.tagName] || p.hasAttribute("data-no-i18n")) return true;
      p = p.parentElement;
    }
    return false;
  }

  function collect(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var out = [], n;
    while ((n = walker.nextNode())) {
      if (!n.nodeValue || !norm(n.nodeValue)) continue;
      if (skipParent(n)) continue;
      out.push(n);
    }
    return out;
  }

  function register(root) {
    collect(root).forEach(function (node) {
      if (node.__i18n) return;
      node.__i18n = true;
      nodes.push({ node: node, ca: node.nodeValue });
    });
  }

  function translateNode(rec, lang) {
    var node = rec.node, ca = rec.ca;
    if (lang === "ca") { node.nodeValue = ca; return; }
    var m = ca.match(/^(\s*)([\s\S]*?)(\s*)$/);
    var key = norm(m[2]);
    var dict = T[lang] || {};
    var tr = dict[key];
    node.nodeValue = (tr != null) ? (m[1] + tr + m[3]) : ca;
  }

  function apply(lang) {
    current = lang;
    for (var i = 0; i < nodes.length; i++) translateNode(nodes[i], lang);
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-lang") === lang);
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    try { localStorage.setItem(STORE, lang); } catch (e) {}
  }

  function initialLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && LANGS.indexOf(q) !== -1) return q;
    try {
      var s = localStorage.getItem(STORE);
      if (s && LANGS.indexOf(s) !== -1) return s;
    } catch (e) {}
    return "ca";
  }

  function buildSwitch() {
    var labels = { ca: "CA", es: "ES", en: "EN" };
    var titles = { ca: "Català", es: "Español", en: "English" };
    function make() {
      var w = document.createElement("div");
      w.className = "lang-switch";
      w.setAttribute("data-no-i18n", "");
      w.setAttribute("role", "group");
      w.setAttribute("aria-label", "Idioma");
      LANGS.forEach(function (l) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("data-lang", l);
        b.title = titles[l];
        b.textContent = labels[l];
        b.addEventListener("click", function () { apply(l); });
        w.appendChild(b);
      });
      return w;
    }
    var navLinks = document.querySelector(".nav-links");
    if (navLinks) {
      var burger = navLinks.querySelector(".nav-burger");
      navLinks.insertBefore(make(), burger || null);
    }
    var navMobile = document.querySelector(".nav-mobile");
    if (navMobile) {
      var mw = make();
      mw.classList.add("lang-switch--mobile");
      navMobile.insertBefore(mw, navMobile.firstChild);
    }
  }

  function start() {
    register(document.body);
    buildSwitch();
    apply(initialLang());
    // Catch dynamically-added content (orbit, quiz steps, results…)
    if ("MutationObserver" in window) {
      var mo = new MutationObserver(function (muts) {
        var added = false;
        muts.forEach(function (m) {
          m.addedNodes && m.addedNodes.forEach(function (nd) {
            if (nd.nodeType === 1 && !nd.closest("[data-no-i18n]")) { register(nd); added = true; }
            else if (nd.nodeType === 3 && nd.parentElement && !skipParent(nd)) {
              if (!nd.__i18n) { nd.__i18n = true; nodes.push({ node: nd, ca: nd.nodeValue }); added = true; }
            }
          });
        });
        if (added && current !== "ca") apply(current);
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
