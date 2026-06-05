public class Main {

    public static void main(String[] args) {

        EMSApplication ems = new EMSApplication();

        while (true) {

            try {
                ems.chooseOption();
                int option = ems.getScanner().nextInt();

                switch (option) {

                    case 1:
                        ems.addEmp();
                        break;

                    case 2:
                        ems.viewEmp();
                        break;

                    case 3:
                        ems.deleteEmp();
                        break;

                    case 4:
                        System.out.println("Exiting Application...");
                        return;

                    default:
                        System.out.println("Invalid Choice!");
                }

            } catch (EmployeeNotFoundException e) {
                System.out.println(e.getMessage());
            }
        }
    }
}