export default function ({$axios, redirect}) {
  $axios.onError(error => {
    if (error?.response?.status === 403) {
      redirect('/login');
    }
    console.log('response from axios', error?.response?.status)
  })
}
