<template>
  <Form :actions="actions"
        :effects="effects"
        :on-change="() => {}">
    <label>username: </label>
    <Field name="username">
      <template #default="{ state, mutators }">
        <input
          :disabled="!state.editable"
          :value="state.value || ''"
          @input="mutators.change"
          @blur="mutators.blur"
          @focus="mutators.focus"
        />
        {{ state.errors }} {{ state.warnings }}
      </template>
    </Field>
  </Form>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api'
import {Form, Field, FormEffectHooks, createFormActions} from '../index'

export default defineComponent({
	name: 'App',
	components: {
		Form,
		Field
	},
	setup() {
		const {onFormInit$, onFieldValueChange$} = FormEffectHooks
		const actions = createFormActions()
		const effects = () => {
			onFormInit$().subscribe(() => {
				console.log('初始化')
			})
			onFieldValueChange$().subscribe(state => {
				console.log('输入变化', state)
			})
		}

		return {
			actions,
			effects
		}
	}
})
</script>
