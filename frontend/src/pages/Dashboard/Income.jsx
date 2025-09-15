import React, { useEffect, useState, useCallback } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import { toast } from 'react-hot-toast'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'

const Income = () => {
  const [incomeData, setIncomeData] = useState([])
  const [, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  //Get All Income Details
  const fetchIncomeData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      )
      if (response.data) {
        setIncomeData(response.data)
      }
    } catch (error) {
      console.error('Error fetching income data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  //handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income

    //Validation Checks
    if (!source.trim()) {
      toast.error('Source is required.')
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      })
      setOpenAddIncomeModal(false)
      toast.success('Income added successfully!')
      fetchIncomeData()
    } catch (error) {
      console.error(
        'Error adding income:',
        error.response?.data || error.message
      )
      const errorMessage =
        error.response?.data?.message ||
        'Failed to add income. Please try again.'
      toast.error(errorMessage)
    }
  }

  //handle Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success('Income deleted successfully!')
      fetchIncomeData()
    } catch (error) {
      console.error(
        'Error deleting income:',
        error.response?.data.message || error.message
      )
      const errorMessage =
        error.response?.data?.message ||
        'Failed to delete income. Please try again.'
      toast.error(errorMessage)
    }
  }

  //handle download income details
  const handleDownloadIncome = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: 'blob',
        }
      )
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'incomes_details.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error downloading income Excel:', error)
      toast.error('Failed to download income Excel file.')
    }
  }

  useEffect(() => {
    fetchIncomeData()
  }, [fetchIncomeData])
  return (
    <DashboardLayout activeMenu='Income'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=' '>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id })
            }}
            onDownload={handleDownloadIncome}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title='Add Income'
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title='Delete Income'
        >
          <DeleteAlert
            content='Are you sure you want to delete this income? This action cannot be undone.'
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}
export default Income
