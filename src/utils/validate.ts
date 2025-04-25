
const required = { required: 'Это поле обязательно' }

export const EmployeesRules = {
  name: {
    ...required,
    minLength: {
      value: 2,
      message: 'Минимум 2 символа',
    },
    maxLength: {
      value: 100,
      message: 'Максимум 100 символов',
    },
  },
  email: {
    ...required,
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Введите правильный формат почты',
    },
  },
  age: {
    ...required,
    min: {
      value: 16,
      message: 'Возраст не может быть меньше 16',
    },
    max: {
      value: 120,
      message: 'Введите правильный возраст',
    },
  },
  position: {
    ...required,
    minLength: {
      value: 2,
      message: 'Минимум 2 символа для должности',
    },
  },
  department: {
    ...required,
    minLength: {
      value: 2,
      message: 'Минимум 2 символа для отдела',
    },
  },
}

export default EmployeesRules
