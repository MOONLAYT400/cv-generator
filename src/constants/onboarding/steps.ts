export const onboardingSteps = [
  {
    title: "Генератор резюме",
    content: "Добро пожаловать в генератор резюме",
    disableBeacon: true,
    placement: "center" as const,
    target: "body",
    showSkipButton: true
  },
  {
    title: "Основная информация",
    content: "Основная информация о соискателе",
    target: ".info",
    disableBeacon: true,
    floaterProps: {
      disableAnimation: true
    },
    spotlightPadding: 1
  },
  {
    title: "Секция загрузки",
    content:
      "Здесь можно загрузить ранее сохраненный файл JSON и продолжить работу с ним, а так же сохранить текущий файл и  скачать себе готовые файлы резюме в разных форматах",
    target: ".downloads",
    disableBeacon: true,
    floaterProps: {
      disableAnimation: true
    },
    spotlightPadding: 1
  },
  {
    title: "Секция стека",
    content: "Здесь можно добавить технологии в общий стек соискателя.",
    target: ".tech",
    disableBeacon: true,
    floaterProps: {
      disableAnimation: true
    },
    spotlightPadding: 1
  },
  {
    title: "Секция образования",
    content:
      "Здесь будут отображаться этапы образования, добавленные ранее. Так же есть возможность редактировать ранее добавленные этапы",
    target: ".education",
    disableBeacon: true,
    floaterProps: {
      disableAnimation: true
    },
    spotlightPadding: 1
  },
  {
    title: "Секция опыта работы",
    content:
      "Здесь будет отображаться информация об опыте работы. Так же есть возможность редактировать ранее добавленные этапы",
    target: ".experience",
    disableBeacon: true,
    floaterProps: {
      disableAnimation: true
    },
    spotlightPadding: 1
  },
  {
    title: "Секция опыта работы",
    content:
      "Здесь будет отображаться информация о добавленных проектах. Так же есть возможность редактировать ранее добавленные проекты",
    target: ".projects",
    disableBeacon: true,
    floaterProps: {
      disableAnimation: true
    },
    spotlightPadding: 1
  },
  {
    title: "Удачи",
    content: "Спасибо за использование",
    disableBeacon: true,
    placement: "center" as const,
    target: "body",
    showSkipButton: false
  }
]
