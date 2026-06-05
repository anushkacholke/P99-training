public class Employee {

    private String name;
    private int id;
    private int age;
    private long sal;

    public Employee(String name, int id, int age, long sal) {
        this.name = name;
        this.id = id;
        this.age = age;
        this.sal = sal;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public int getAge() {
        return age;
    }

    public long getSal() {
        return sal;
    }

    @Override
    public String toString() {
        return "Name = " + name +
                ", ID = " + id +
                ", Age = " + age +
                ", Salary = " + sal;
    }
}