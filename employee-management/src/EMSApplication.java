import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class EMSApplication {

    private List<Employee> employees = new ArrayList<>();
    private Scanner sc = new Scanner(System.in);

    public Scanner getScanner() {
        return sc;
    }

    public void chooseOption() {

        System.out.println("\n===== Employee Management System =====");
        System.out.println("1. Add Employee");
        System.out.println("2. View Employees");
        System.out.println("3. Delete Employee");
        System.out.println("4. Exit");
        System.out.print("Enter Choice: ");
    }

    public void addEmp() {

        System.out.print("Enter Employee Name: ");
        String name = sc.next();

        System.out.print("Enter Employee ID: ");
        int id = sc.nextInt();

        System.out.print("Enter Employee Age: ");
        int age = sc.nextInt();

        System.out.print("Enter Employee Salary: ");
        long sal = sc.nextLong();

        Employee emp = new Employee(name, id, age, sal);

        employees.add(emp);

        System.out.println("Employee Added Successfully!");
    }

    public void viewEmp() {

        if (employees.isEmpty()) {
            System.out.println("No Employees Found.");
            return;
        }

        System.out.println("\nEmployee List:");

        for (Employee emp : employees) {
            System.out.println(emp);
        }
    }

    public void deleteEmp() {

        System.out.print("Enter Employee ID to Delete: ");
        int id = sc.nextInt();

        boolean removed =
                employees.removeIf(emp -> emp.getId() == id);

        if (!removed) {
            throw new EmployeeNotFoundException(
                    "Employee not found with ID: " + id
            );
        }

        System.out.println("Employee Deleted Successfully!");
    }
}