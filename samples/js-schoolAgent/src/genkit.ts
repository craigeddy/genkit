/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { genkit } from 'genkit/beta';
import type { AgentState } from './types';
import {openAICompatible} from "@genkit-ai/compat-oai";
import {modelRef} from "genkit";

// Define a reference to your model
export const myLocalModel = modelRef({
  name: 'spark/nvidia/Qwen3.8-27B-NVFP4', // format: <name property from plugin>/<model id from provider>
  // You can specify model-specific configuration here if needed.
  // For many custom models, Genkit's default capabilities are sufficient.
});

export const ai = genkit({
  plugins: [openAICompatible({
    name: 'spark',
    apiKey: 'xxx', // Required, but can be a placeholder for local servers
    baseURL: 'http://10.10.21.2:8000/v1',
  }),],
  model: myLocalModel,
});

ai.defineHelper(
  'userContext',
  (state: AgentState) => `=== User Context

- The current parent user is ${state?.parentName}
- The current date and time is: ${new Date().toString()}

=== Registered students of the current user

${state?.students.map((s) => ` - ${s.name}, student id: ${s.id} grade: ${s.grade}, activities: \n${s.activities.map((a) => `   - ${a}`).join('\n')}`).join('\n\n')}`
);

export { z } from 'genkit';
