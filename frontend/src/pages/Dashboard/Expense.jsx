import React, { useEffect, useState, useCallback } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/Modal'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import { toast } from 'react-hot-toast'
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert'

const Expense = () => {
  const [expenseData, setExpenseData] = useState([])
  const [, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  //Get All Expense Details
  const fetchExpenseData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      )
      if (response.data) {
        setExpenseData(response.data)
      }
    } catch (error) {
      console.error('Error fetching expense data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  //handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, source, amount, date, icon } = expense

    //Validation Checks
    if (!category.trim()) {
      toast.error('Category is required.')
      return
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Please enter a valid amount greater than zero.')
      return
    }
    if (!date) {
      toast.error('Date is required.')
      return
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        source,
        amount,
        date,
        icon,
      })
      setOpenAddExpenseModal(false)
      toast.success('Expense added successfully!')
      fetchExpenseData()
    } catch (error) {
      console.error(
        'Error adding expense:',
        error.response?.data || error.message
      )
      const errorMessage =
        error.response?.data?.message ||
        'Failed to add expense. Please try again.'
      toast.error(errorMessage)
    }
  }

  //handle Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success('Expense deleted successfully!')
      fetchExpenseData()
    } catch (error) {
      console.error(
        'Error deleting expense:',
        error.response?.data.message || error.message
      )
      const errorMessage =
        error.response?.data?.message ||
        'Failed to delete expense. Please try again.'
      toast.error(errorMessage)
    }
  }

  //handle download expense details
  const handleDownloadExpense = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: 'blob',
        }
      )
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'expenses_details.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error downloading expense Excel:', error)
      toast.error('Failed to download expense Excel file.')
    }
  }

  useEffect(() => {
    fetchExpenseData()
  }, [fetchExpenseData])
  return (
    <DashboardLayout activeMenu='Expense'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=' '>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id })
            }}
            onDownload={handleDownloadExpense}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title='Add Expense'
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title='Delete Expense'
        >
          <DeleteAlert
            content='Are you sure you want to delete this expense? This action cannot be undone.'
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
