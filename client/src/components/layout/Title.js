const getStyles = () => ({
  title: {
    fontSize: 32,
    fontWeight: 700,
    padding: '15px',
    marginBottom: '50px'
  }
})

const Title = (props) => {
  const styles = getStyles()

  return <h1 style={styles.title}>{props.title}</h1>
}

export default Title
