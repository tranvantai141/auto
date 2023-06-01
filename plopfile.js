const config = (plop) => {
  //SCREEN
  plop.setGenerator("Screen", {
    description: "Generate a new screen",
    prompts: [
      {
        type: "input",
        name: "stackName",
        message: "What is the name of the stack",
      },
      {
        type: "input",
        name: "screenName",
        message: "What is the name of the screen",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/screens/{{pascalCase stackName}}.{{pascalCase screenName}}Screen/Model.{{pascalCase screenName}}Screen.ts",
        templateFile: "plopTemplates/screen/Model.hbs",
      },
      {
        type: "add",
        path: "src/screens/{{pascalCase stackName}}.{{pascalCase screenName}}Screen/Styles.{{pascalCase screenName}}Screen.ts",
        templateFile: "plopTemplates/screen/Styles.hbs",
      },
      {
        type: "add",
        path: "src/screens/{{pascalCase stackName}}.{{pascalCase screenName}}Screen/View.{{pascalCase screenName}}Screen.tsx",
        templateFile: "plopTemplates/screen/View.hbs",
      },
      {
        type: "add",
        path: "src/screens/{{pascalCase stackName}}.{{pascalCase screenName}}Screen/ViewModel.{{pascalCase screenName}}Screen.ts",
        templateFile: "plopTemplates/screen/ViewModel.hbs",
      },
    ],
  });

  //STATE
  plop.setGenerator("State", {
    description: "Generate a new global state",
    prompts: [
      {
        type: "input",
        name: "state",
        message: "What is the name of the global state",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/globalState/{{lowerCase state}}State/{{lowerCase state}}.actions.ts",
        templateFile: "plopTemplates/state/state.actions.hbs",
      },
      {
        type: "add",
        path: "src/globalState/{{lowerCase state}}State/{{lowerCase state}}.model.ts",
        templateFile: "plopTemplates/state/state.model.hbs",
      },
      {
        type: "add",
        path: "src/globalState/{{lowerCase state}}State/{{lowerCase state}}.reducer.ts",
        templateFile: "plopTemplates/state/state.reducer.hbs",
      },
      {
        type: "add",
        path: "src/globalState/{{lowerCase state}}State/{{lowerCase state}}.types.ts",
        templateFile: "plopTemplates/state/state.types.hbs",
      },
      {
        type: "modify",
        path: "src/globalState/ReduxManager.ts",
        pattern: /(\/\/ plop import marker)/gi,
        template:
          'import {{pascalCase state}}Reducer from "./{{lowerCase state}}State/{{lowerCase state}}.reducer";\n$1',
      },
      {
        type: "modify",
        path: "src/globalState/ReduxManager.ts",
        pattern: /(\/\/ plop rootReducer marker)/gi,
        template: "{{lowerCase state}}: {{pascalCase state}}Reducer,\n$1",
      },
    ],
  });

  //SERVICE
  plop.setGenerator("Service", {
    description: "Generate a new service",
    prompts: [
      {
        type: "input",
        name: "serviceName",
        message: "What is the name of the service",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/services/{{pascalCase serviceName}}.services.ts",
        templateFile: "plopTemplates/service/serviceTem.hbs",
      },
      {
        type: "modify",
        path: "src/services/index.tsx",
        pattern: /(\/\/ plop export marker)/gi,
        template:
          'export { default as {{pascalCase serviceName}}Services } from "@src/services/{{pascalCase serviceName}}.services";\n$1',
      },
    ],
  });
};

module.exports = config;
