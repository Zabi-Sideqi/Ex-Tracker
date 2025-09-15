import moment from 'moment'

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}
export const validatePassword = (password) => {
  // Password must be at least 8 characters long and contain at least one number and one special character
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/
  return re.test(password)
}

export const getInitials = (name) => {
  if (!name) return ''

  const words = name.trim().split(' ')
  let initials = ''
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0]
  }
  return initials.toUpperCase()
}

export const addThousandsSeparator = (num) => {
  if (num === undefined || num === null || isNaN(num)) return '0'

  const [integerPart, fractionalPart] = num.toString().split('.')
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger
}

export const prepareExpenseBarChartData = (data = []) => {
  if (!Array.isArray(data)) return []
  const chartData = data.map((item) => ({
    date: item?.date ? moment(item.date).format('Do MMM YY') : '',
    amount: item?.amount,
    category: item?.category,
  }))
  return chartData
}

export const prepareIncomeBarChartData = (data = []) => {
  const sorteddata = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )

  const chartData = sorteddata.map((item) => ({
    month: moment(item?.date).format('Do YYYY'),
    amount: item?.amount,
    source: item?.source,
  }))

  return chartData
}
